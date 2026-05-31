import './TodoList.css';
import type {FilterValuesType} from "../../App.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
// import {AddTodo} from "../AddTodo/AddTodo.tsx";
import TextField from '@mui/material/TextField';
import {AddTodo} from "../AddTodo/AddTodo.tsx";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void,
    filter: FilterValuesType;
}

// const Container = styled.div`
//   padding: 20px;
//   background-color: ${({ theme }) => (theme === 'light' ? '#f5f5f5' : '#333')};
//   color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
// `;


const TodoList = (props: PropsType) => {

    // const { theme } = useTheme();

    const [title, setTitle] = useState("");
    const [error, setError] = useState('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);

        if (error) {
            setError('');
        }
    };


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };


    const addTask = () => {
        const trimmedTitle = title.trim();
        const isExist = props.tasks.some(
            task => task.title.toLowerCase() === trimmedTitle.toLowerCase()
        );

        if (isExist) {
            setError('This task already exists');
            return;
        }

        if (!trimmedTitle) {
            setError('Task title is required');
            return;
        }

        props.addTask(trimmedTitle);
        setTitle('');
        setError('');
    };

    const handleFilterChange = (
        _: React.MouseEvent<HTMLElement>,
        newFilter: FilterValuesType | null
    ) => {
        if (newFilter !== null) {
            props.changeFilter(newFilter);
        }
    };

    return (
        <div className='todolist'>
            <h3 className='title'>{props.title}</h3>

            <TextField
                id="outlined-basic"
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label="New task"
                size="small"
            />

            <AddTodo addTask={addTask}/>

            <ul>
                {
                    props.tasks.map(task => {

                            const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked)
                            }
                            return <li key={task.id}>
                                <input type="checkbox"
                                       onChange={onChangeCheckbox}
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.5091 6.82736L12.9018 4.43468L12.9025 4.43398C13.2324 4.10414 13.3974 3.93916 13.4592 3.74885C13.5136 3.58133 13.5136 3.40088 13.4592 3.23337C13.3973 3.04292 13.2321 2.87769 12.9018 2.54738L11.4506 1.09625C11.1217 0.767352 10.9569 0.602571 10.7669 0.540824C10.5993 0.486392 10.4189 0.486392 10.2514 0.540824C10.0612 0.602613 9.8962 0.767585 9.5669 1.09695L9.5654 1.09837L7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736ZM7.17272 3.49106L10.5091 6.82736"
                                            stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <Tooltip title="Delete">
                                    <IconButton onClick={() => props.removeTask(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                {/*<button onClick={() => {*/}
                                {/*    props.removeTask(task.id)*/}
                                {/*}}>*/}
                                {/*    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"*/}
                                {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                {/*        <path*/}
                                {/*            d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z"*/}
                                {/*            stroke="#CDCDCD"/>*/}
                                {/*        <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>*/}
                                {/*        <path*/}
                                {/*            d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"*/}
                                {/*            stroke="#CDCDCD"/>*/}
                                {/*        <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>*/}
                                {/*        <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>*/}
                                {/*    </svg>*/}
                                {/*</button>*/}
                            </li>
                        }
                    )
                }
            </ul>

            <div>
                <ToggleButtonGroup
                    color="primary"
                    value={props.filter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label="Filter tasks"
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>

                </ToggleButtonGroup>
            </div>

            {/*<TodoItem/>*/}
            {/*<EditTodo/>*/}

        </div>
    )
}

export default TodoList;
