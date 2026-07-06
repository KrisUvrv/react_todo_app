import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { EditTodo } from '../EditTodo/EditTodo.tsx';
import {
  DateText,
  Left,
  Right,
  Title,
  TodoItemContainer,
} from './TodoItem.styles.ts';

import { useAppDispatch } from '@/store/store.ts';
import { deleteTodoThunk, toggleTodoThunk } from '@/store/todoSlice.ts';
import type { Todo } from '@/types';

type Props = {
  task: Todo;
};

export const TodoItem = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const removeTodo = () => dispatch(deleteTodoThunk(task.id));

  const toggleTodo = () => {
    dispatch(toggleTodoThunk(task.id));
  };

  return (
    <TodoItemContainer>
      <Left>
        <Checkbox checked={task.completed} onChange={toggleTodo} />

        {isEditing ? (
          <EditTodo task={task} onClose={() => setIsEditing(false)} />
        ) : (
          <Title $completed={task.completed}>{task.text}</Title>
        )}
      </Left>

      <Right>
        <DateText>{new Date(task.createdAt).toLocaleDateString()}</DateText>

        <Tooltip title="Edit">
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={removeTodo}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Right>
    </TodoItemContainer>
  );
};
