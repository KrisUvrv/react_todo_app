import {
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
  updateTodo,
} from '@/api/todos';
import type {
  FetchTodosParams,
  Todo,
  TodoFilter,
  TodoSort,
  TodosResponse,
} from '@/types';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface TodoState {
  tasks: Todo[];
  page: number;
  limit: number;
  filter: TodoFilter;
  sort: TodoSort;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  tasks: [],
  page: 1,
  limit: 5,
  filter: 'all',
  sort: 'newest',
  totalPages: 0,
  isLoading: false,
  error: null,
};

export const fetchTodosThunk = createAsyncThunk<
  TodosResponse,
  FetchTodosParams
>('todos/fetchTodos', async (params: FetchTodosParams) => {
  return await fetchTodos(params);
});

export const createTodoThunk = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>('todos/createTodo', async (text: string, { rejectWithValue }) => {
  try {
    return await createTodo(text);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error ?? 'Error');
    }
    return rejectWithValue('Error');
  }
});

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async ({
    id,
    payload,
  }: {
    id: number;
    payload: { text?: string; completed?: boolean };
  }) => {
    return await updateTodo(id, payload);
  },
);

export const toggleTodoThunk = createAsyncThunk(
  'todos/toggleTodo',
  async (id: number) => {
    return await toggleTodo(id);
  },
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await deleteTodo(id);
    return id;
  },
);

const replaceTodo = (state: TodoState, todo: Todo) => {
  const index = state.tasks.findIndex((t) => t.id === todo.id);

  if (index !== -1) {
    state.tasks[index] = todo;
  }
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<TodoSort>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTodosThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTodoThunk.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.error = null;
      })
      .addCase(createTodoThunk.rejected, (state, action) => {
        state.error = action.payload ?? 'Error';
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        replaceTodo(state, action.payload);
      })
      .addCase(toggleTodoThunk.fulfilled, (state, action) => {
        replaceTodo(state, action.payload);
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;
