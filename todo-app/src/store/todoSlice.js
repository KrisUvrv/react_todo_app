import { createTodo, deleteTodo, fetchTodos, toggleTodo, updateTodo, } from '@/api/todos';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
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
export const fetchTodosThunk = createAsyncThunk('todos/fetchTodos', async (params) => {
    return await fetchTodos(params);
});
export const refetchTodosThunk = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
    return await fetchTodos(getState().todos);
});
export const createTodoThunk = createAsyncThunk('todos/createTodo', async (text, { rejectWithValue, dispatch }) => {
    try {
        await createTodo(text);
        await dispatch(refetchTodosThunk());
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.error ?? 'Error');
        }
        return rejectWithValue('Error');
    }
});
export const updateTodoThunk = createAsyncThunk('todos/updateTodo', async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await updateTodo(id, payload);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.error ?? 'Error');
        }
        return rejectWithValue('Error');
    }
});
export const toggleTodoThunk = createAsyncThunk('todos/toggleTodo', async (id) => {
    return await toggleTodo(id);
});
export const deleteTodoThunk = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
    await deleteTodo(id);
    await thunkAPI.dispatch(refetchTodosThunk());
    return id;
});
const replaceTodo = (state, todo) => {
    const index = state.tasks.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
        state.tasks[index] = todo;
    }
};
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
            state.page = 1;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.page = 1;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
            state.page = 1;
        },
        clearError: (state) => {
            state.error = null;
        },
        startEditing: (state, action) => {
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
