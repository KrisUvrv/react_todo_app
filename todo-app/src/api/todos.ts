import type {
  FetchTodosParams,
  Todo,
  TodosResponse,
  UpdateTodoPayload,
} from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchTodos = async ({
  page,
  limit,
  filter,
  sort,
}: FetchTodosParams): Promise<TodosResponse> => {
  const response = await api.get<TodosResponse>('/todos', {
    params: {
      page,
      limit,
      filter,
      sort,
    },
  });
  return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await api.post<Todo>(`/todos`, { text });
  return response.data;
};

export const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
  const response = await api.put<Todo>(`/todos/${id}`, payload);
  return response.data;
};

export const toggleTodo = async (id: number) => {
  const response = await api.patch<Todo>(`/todos/${id}/toggle`);
  return response.data;
};
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
