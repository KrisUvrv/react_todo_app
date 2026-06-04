import {useState} from "react";
import type { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditTodo} from "../EditTodo/EditTodo.tsx";
import type {TaskType} from "../../types/task.ts";
import './TodoItem.css';
import {Checkbox} from "@mui/material";

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
        <li className="todo-item">
            <div className="todo-item__left">
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
                    <span
                        className={`todo-item__title ${
                            task.isDone ? 'completed' : ''
                        }`}
                    >{task.title}</span>
                )}
            </div>

            <div className="todo-item__right">
                <small className="todo-item__date">
                    {new Date(task.createdAt).toLocaleDateString()}
                </small>

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
            </div>
        </li>
    );
};
