import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { EditTodo } from '../EditTodo/EditTodo.tsx';
import * as S from './TodoItem.styles.ts';

import { useAppDispatch } from '@/store/store.ts';
import {
  deleteTodoThunk,
  todoActions,
  toggleTodoThunk,
} from '@/store/todoSlice.ts';
import type { Todo } from '@/types';

type Props = {
  task: Todo;
  isEditing: boolean;
  onEditClick: (id: number) => void;
};

export const TodoItem = ({ task, isEditing, onEditClick }: Props) => {

  const dispatch = useAppDispatch();

  const removeTodo = () => dispatch(deleteTodoThunk(task.id));
  const toggleTodo = () => {
    dispatch(toggleTodoThunk(task.id));
  };

  return (
    <S.TodoItemContainer>
      <S.Left>
        <Checkbox
          checked={task.completed}
          onChange={toggleTodo}
        />

        {isEditing ? (
          <EditTodo
            task={task}
            onClose={() => {
              dispatch(todoActions.stopEditing());
            }}
          />
        ) : (
          <S.Title $completed={task.completed}>{task.text}</S.Title>
        )}
      </S.Left>

      <S.Right>
        <S.DateText>{new Date(task.createdAt).toLocaleDateString()}</S.DateText>

        <Tooltip title="Edit">
          <Button
            onClick={() => {
              onEditClick(task.id);
            }}
          >
            Edit
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={removeTodo}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </S.Right>
    </S.TodoItemContainer>
  );
};
