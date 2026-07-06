export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export type TodoFilter = 'all' | 'completed' | 'active';
export type TodoSort = 'newest' | 'oldest';
