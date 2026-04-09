import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  TriggerType,
  TimestampTrigger,
} from '@notifee/react-native';

const CHANNEL_ID = 'clearday-reminders';
const WEATHER_CHANNEL_ID = 'clearday-weather-alerts';

const ensureChannel = async (): Promise<void> => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Reminders',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  const settings = await notifee.requestPermission();
  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
};

export const scheduleReminderNotification = async (
  id: string,
  title: string,
  dateTime: number,
): Promise<string> => {
  await ensureChannel();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: dateTime,
  };

  const notificationId = await notifee.createTriggerNotification(
    {
      id,
      title: '⏰ Reminder',
      body: title,
      android: {
        channelId: CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
      ios: {
        sound: 'default',
      },
    },
    trigger,
  );

  return notificationId;
};

export const cancelReminderNotification = async (notificationId: string): Promise<void> => {
  await notifee.cancelTriggerNotification(notificationId);
};

/**
 * Schedules a weather-alert notification for a task.
 * Fires 1 hour before `taskDateTime`, or in 5 seconds if less than 1 hour away.
 */
export const scheduleWeatherAlertNotification = async (
  taskId: string,
  taskTitle: string,
  taskDateTime: number,
  weatherDescription: string,
): Promise<string> => {
  await notifee.createChannel({
    id: WEATHER_CHANNEL_ID,
    name: 'Weather Alerts',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  const ONE_HOUR = 60 * 60 * 1000;
  const fireAt = taskDateTime - ONE_HOUR > Date.now()
    ? taskDateTime - ONE_HOUR
    : Date.now() + 5_000;

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: fireAt,
  };

  const notificationId = await notifee.createTriggerNotification(
    {
      id: `weather_${taskId}`,
      title: '☔ Rain expected',
      body: `${weatherDescription} near your task time. Leave early or reschedule "${taskTitle}".`,
      android: {
        channelId: WEATHER_CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
      ios: {
        sound: 'default',
      },
    },
    trigger,
  );

  return notificationId;
};
