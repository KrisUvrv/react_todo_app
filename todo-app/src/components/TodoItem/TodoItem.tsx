import {useState} from "react";
import type {ChangeEvent} from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditTodo} from "../EditTodo/EditTodo.tsx";
import {Checkbox} from "@mui/material";
import {DateText, Title, Left, Right, TodoItemContainer} from "./TodoItem.styles.ts";
import type {TaskType} from "@/types/task";

type Props = {
  task: TaskType;
  tasks: TaskType[];

  removeTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
};

export const TodoItem = ({task, tasks, removeTask, editTask, changeStatus}: Props) => {

  const [isEditing, setIsEditing] = useState(false);

  const onChangeCheckbox = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeStatus(task.id, e.currentTarget.checked);
  };

  return (
    <TodoItemContainer>
      <Left>
        <Checkbox
          checked={task.isDone}
          onChange={onChangeCheckbox}
        />

        {isEditing ? (
          <EditTodo
            task={task}
            tasks={tasks}
            editTask={editTask}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <Title $completed={task.isDone}>
            {task.title}
          </Title>
        )}
      </Left>

      <Right>
        <DateText>
          {new Date(task.createdAt).toLocaleDateString()}
        </DateText>

        <Tooltip title="Edit">
          <Button onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => removeTask(task.id)}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      </Right>
    </TodoItemContainer>
  );
};
