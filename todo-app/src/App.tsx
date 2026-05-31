import './App.css';
import TodoList, {type TaskType} from "./components/TodoList/TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import ThemeSwitcher from "./theme/ThemeSwitcher.tsx";

export type FilterValuesType = 'all' | 'completed' | 'active';

const App = () => {

    const initTasks: Array<TaskType> = [
        {id: v1(), title: 'learn html', isDone: true},
        {id: v1(), title: 'learn css', isDone: true},
        {id: v1(), title: 'learn js', isDone: true},
        {id: v1(), title: 'learn react', isDone: false},
        {id: v1(), title: 'learn redux', isDone: false},
    ];

    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
        }
        let copy = [...tasks];
        setTasks(copy);

    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let taskForTodoList = tasks;

    if (filter === 'completed') {
        taskForTodoList = tasks.filter(task => task.isDone);
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(task => !task.isDone);
    }

    return (
        <>
            <ThemeSwitcher />
            <TodoList title='TODO LIST'
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      filter={filter}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </>
    )
}

export default App;
