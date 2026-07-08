import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { type ChangeEvent, useState } from 'react';

import type { Todo } from '@/types';

type Props = {
  task: Todo;
  onClose: () => void;
  clearServerError: () => void;
  onSave: (title: string) => Promise<void>;
};

export const EditTodo = ({
  task,
  onClose,
  clearServerError,
  onSave,
}: Props) => {
  const [editTitle, setEditTitle] = useState(task.text);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);

    if (error) {
      clearServerError();
    }
  };

  const saveEditTask = async () => {
    const trimmedTitle = editTitle.trim();

    try {
      await onSave(trimmedTitle);
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
