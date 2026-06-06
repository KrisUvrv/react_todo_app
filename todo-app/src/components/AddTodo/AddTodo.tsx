import {useState, type ChangeEvent, type KeyboardEvent} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type {TaskType} from "@/types/task";

type Props = {
  addTask: (title: string) => void;
  tasks: TaskType[];
};

export const AddTodo = ({addTask, tasks}: Props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const createTask = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    const isExist = tasks.some(
      task =>
        task.title.toLowerCase() ===
        trimmedTitle.toLowerCase()
    );

    if (isExist) {
      setError('This task already exists');
      return;
    }

    addTask(trimmedTitle);

    setTitle('');
    setError('');
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(e.currentTarget.value);

    if (error) {
      setError('');
    }
  };

  const onKeyDownHandler = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  return (
    <>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
        label="New task"
        size="small"
      />

      <Button
        variant="contained"
        onClick={createTask}
      >
        Add
      </Button>
    </>
  );
};
