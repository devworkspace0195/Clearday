export interface HomeUser {
  name: string;
  email: string;
}

export interface StatItem {
  emoji: string;
  value: string;
  label: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel?: string;
}

export interface WeatherSuggestion {
  taskId: string;
  taskTitle: string;
  taskTimeLabel: string;
  weatherDescription: string;
  weatherEmoji: string;
  /** True for rain, drizzle, thunderstorm, or snow — triggers "Reschedule?" CTA. */
  isRain: boolean;
}

export interface TodayReminder {
  id: string;
  title: string;
  timeLabel: string;
  completed: boolean;
}

export type { WeatherData } from '../../utils/weatherApi';

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: import('../../utils/weatherApi').WeatherData };
