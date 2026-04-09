export interface Task {
  id: string;
  title: string;
  completed: boolean;
  imageUri?: string;
  /** Midnight-normalised timestamp of the due date (for Today/Tomorrow labels). */
  dueDate?: number;
  /** Full datetime timestamp (dueDate + chosen hour:minute) — set only when user picks a time. */
  dueTime?: number;
  createdAt: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface FilterTab {
  label: string;
  value: TaskFilter;
}

export const FILTER_TABS: FilterTab[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Done', value: 'completed' },
];

export const TASK_ITEM_HEIGHT = 64;
