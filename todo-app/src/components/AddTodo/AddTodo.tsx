import './AddTodo.css';
import Button from '@mui/material/Button';

type PropsType = {
    addTask: () => void,
}
export function AddTodo(props: PropsType) {
    return <Button variant="contained"
                        onClick={props.addTask}
    >Add task</Button>;
}

