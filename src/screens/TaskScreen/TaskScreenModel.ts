export interface Task {
  id: string;
  title: string;
  completed: boolean;
  imageUri?: string;
  dueDate?: number;
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
