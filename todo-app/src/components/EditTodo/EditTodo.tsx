import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type {TaskType} from "../../types/task.ts";


type Props = {
    task: TaskType;
    tasks: TaskType[];

    editTask: (id: string, newTitle: string) => void;
    onClose: () => void;
};

export const EditTodo = ({
                             task,
                             tasks,
                             editTask,
                             onClose,
                         }: Props) => {

    const [editTitle, setEditTitle] = useState(task.title);
    const [editError, setEditError] = useState('');

    const saveEditTask = () => {
        const trimmedTitle = editTitle.trim();

        if (!trimmedTitle) {
            setEditError('Task title is required');
            return;
        }

        const isExist = tasks.some(
            t =>
                t.id !== task.id &&
                t.title.toLowerCase() ===
                trimmedTitle.toLowerCase()
        );

        if (isExist) {
            setEditError('This task already exists');
            return;
        }

        editTask(task.id, trimmedTitle);
        onClose();
    };

    return (
        <>
            <TextField
                size="small"
                value={editTitle}
                onChange={(e) => {
                    setEditTitle(e.target.value);

                    if (editError) {
                        setEditError('');
                    }
                }}
                error={!!editError}
                helperText={editError}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        saveEditTask();
                    }
                }}
            />

            <Button onClick={saveEditTask}>
                Save
            </Button>
        </>
    );
};
