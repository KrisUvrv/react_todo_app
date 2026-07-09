import {
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
  updateTodo,
} from '@/api/todos';
import { createAppAsyncThunk } from '@/store/createAppAsyncThunk.ts';
import type {
  FetchTodosParams,
  Todo,
  TodoFilter,
  TodoSort,
  TodosResponse,
  UpdateTodoPayload,
} from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
  editingTodoId: number | null;
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
  editingTodoId: null,
};

export const fetchTodosThunk = createAppAsyncThunk<
  TodosResponse,
  FetchTodosParams
>('todos/fetchTodos', async (params: FetchTodosParams) => {
  return await fetchTodos(params);
});

export const refetchTodosThunk = createAppAsyncThunk<TodosResponse, void>(
  'todos/fetchTodos',
  async (_, { getState }) => {
    return await fetchTodos(getState().todos);
  },
);

export const createTodoThunk = createAppAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('todos/createTodo', async (text: string, { rejectWithValue, dispatch }) => {
  try {
    await createTodo(text);
    await dispatch(refetchTodosThunk());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error ?? 'Error');
    }
    return rejectWithValue('Error');
  }
});

export const updateTodoThunk = createAppAsyncThunk<
  Todo,
  {
    id: number;
    payload: UpdateTodoPayload;
  },
  { rejectValue: string }
>('todos/updateTodo', async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await updateTodo(id, payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error ?? 'Error');
    }

    return rejectWithValue('Error');
  }
});

export const toggleTodoThunk = createAppAsyncThunk<
  Todo,
  number,
  { rejectValue: string }
>('todos/toggleTodo', async (id, { rejectWithValue }) => {
  try {
    return await toggleTodo(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error ?? 'Error');
    }
    return rejectWithValue('Error');
  }
});

export const deleteTodoThunk = createAppAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (id, { dispatch }) => {
    await deleteTodo(id);
    await dispatch(refetchTodosThunk());
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
    startEditing: (state, action: PayloadAction<number>) => {
      state.editingTodoId = action.payload;
    },
    stopEditing: (state) => {
      state.editingTodoId = null;
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
      .addCase(createTodoThunk.fulfilled, (state) => {
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
      });
  },
});

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;
