import './TodoList.css';
import type {FilterValuesType, SortType} from "../../App.tsx";
import React, {type ChangeEvent, type KeyboardEvent, useState} from "react";
// import {AddTodo} from "../AddTodo/AddTodo.tsx";
import TextField from '@mui/material/TextField';
import {AddTodo} from "../AddTodo/AddTodo.tsx";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
    createdAt: number
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    editTask: (id: string, newTitle: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void,
    filter: FilterValuesType;
    sort: SortType;
    changeSort: (sort: SortType) => void;
}

const TodoList = (props: PropsType) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState('');
    const [editError, setEditError] = useState('');

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');

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

    const saveEditTask = (taskId: string) => {
        const trimmedTitle = editTitle.trim();

        if (!trimmedTitle) {
            setEditError('Task title is required');
            return;
        }

        const isExist = props.tasks.some(
            task =>
                task.id !== taskId &&
                task.title.toLowerCase() === trimmedTitle.toLowerCase()
        );

        if (isExist) {
            setEditError('This task already exists');
            return;
        }

        props.editTask(taskId, trimmedTitle);

        setEditingId(null);
        setEditTitle('');
        setEditError('');
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

            <div>
                <ToggleButtonGroup
                    value={props.sort}
                    exclusive
                    onChange={(_, value: SortType | null) => {
                        if (value) {
                            props.changeSort(value);
                        }
                    }}
                >
                    <ToggleButton value="newest">
                        Newest
                    </ToggleButton>

                    <ToggleButton value="oldest">
                        Oldest
                    </ToggleButton>
                </ToggleButtonGroup>

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
                                {editingId === task.id ? (
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
                                                    saveEditTask(task.id);
                                                }
                                            }}
                                        />

                                        <Button onClick={() => saveEditTask(task.id)}>
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <span>{task.title}</span>
                                )
                                }
                                <small style={{marginLeft: '10px'}}>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </small>


                                <Tooltip title="Edit">
                                    <Button
                                        onClick={() => {
                                            setEditingId(task.id);
                                            setEditTitle(task.title);
                                        }}>Edit
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton onClick={() => props.removeTask(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                            </li>
                        }
                    )
                }
            </ul>

            {/*<TodoItem/>*/}
            {/*<EditTodo/>*/}

        </div>
    )
}

export default TodoList;
