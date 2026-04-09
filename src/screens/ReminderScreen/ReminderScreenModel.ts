export interface Reminder {
  id: string;
  title: string;
  dateTime: number;
  notificationId: string;
  completed: boolean;
  createdAt: number;
}

export const REMINDER_ITEM_HEIGHT = 80;
