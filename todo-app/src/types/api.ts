import type { Todo, TodoFilter, TodoSort } from '@/types/todo.ts';

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchTodosParams {
  page: number;
  limit: number;
  filter: TodoFilter;
  sort: TodoSort;
}

export interface UpdateTodoPayload {
  text?: string;
  completed?: boolean;
}
