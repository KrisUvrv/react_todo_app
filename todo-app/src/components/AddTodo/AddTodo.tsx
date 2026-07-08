import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { createTodoThunk, todoActions } from '@/store/todoSlice.ts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

export const AddTodo = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const error = useAppSelector((state) => state.todos.error);

  const clearServerError = () => {
    dispatch(todoActions.clearError());
  };

  const handleAddTask = () => {
    const value = title.trim();

    if (!value) return;

    dispatch(createTodoThunk(value));

    setTitle('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    clearServerError();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleFocus = () => {
    clearServerError();
  };

  return (
    <>
      <TextField
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        error={Boolean(error)}
        helperText={error}
        label="New task"
        size="small"
      />

      <Button variant="contained" onClick={handleAddTask}>
        Add
      </Button>
    </>
  );
};
