import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { type ChangeEvent, useState } from 'react';

import { useAppDispatch } from '@/store/store.ts';
import { todoActions, updateTodoThunk } from '@/store/todoSlice.ts';
import type { Todo } from '@/types';

type Props = {
  task: Todo;
  onClose: () => void;
};

export const EditTodo = ({ task, onClose }: Props) => {
  const [editTitle, setEditTitle] = useState(task.text);

  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);

    if (error) {
      dispatch(todoActions.clearError());
    }
  };

  const saveEditTask = async () => {
    const trimmedTitle = editTitle.trim();

    try {
      await dispatch(
        updateTodoThunk({
          id: task.id,
          payload: {
            text: trimmedTitle,
          },
        }),
      ).unwrap();

      onClose();
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <>
        <TextField
          size="small"
          value={editTitle}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          onKeyDown={(e) => e.key === 'Enter' && saveEditTask()}
        />

        <Button onClick={saveEditTask}>Save</Button>
    </>
  );
};
