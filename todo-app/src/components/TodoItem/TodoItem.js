import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { EditTodo } from '../EditTodo/EditTodo.tsx';
import * as S from './TodoItem.styles.ts';
export const TodoItem = ({ task, isEditing, onEditClick, onSave, onDelete, toggleTodo, clearServerError, onCloseEdit, }) => {
    return (<S.TodoItemContainer>
      <S.Left>
        <Checkbox checked={task.completed} onChange={() => toggleTodo(task.id)}/>

        {isEditing ? (<EditTodo task={task} onClose={onCloseEdit} clearServerError={clearServerError} onSave={async (title) => onSave(task.id, title)}/>) : (<S.Title $completed={task.completed}>{task.text}</S.Title>)}
      </S.Left>

      <S.Right>
        <S.DateText>{new Date(task.createdAt).toLocaleDateString()}</S.DateText>

        <Tooltip title="Edit">
          <Button onClick={() => {
            onEditClick(task.id);
        }}>
            Edit
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </S.Right>
    </S.TodoItemContainer>);
};
