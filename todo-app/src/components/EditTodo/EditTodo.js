import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
export const EditTodo = ({ task, onClose, clearServerError, onSave, }) => {
    const [editTitle, setEditTitle] = useState(task.text);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
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
        }
        catch (error) {
            setError(error);
        }
    };
    return (<>
      <TextField size="small" value={editTitle} onChange={handleChange} error={!!error} helperText={error} onKeyDown={(e) => e.key === 'Enter' && saveEditTask()}/>

      <Button onClick={saveEditTask}>Save</Button>
    </>);
};
