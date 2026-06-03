import TodoList from "./components/TodoList/TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import type {FilterValuesType, SortType} from "./types/todo.ts";
import type {TaskType} from "./types/task.ts";

const App = () => {

    const initTasks: Array<TaskType> = [
        {id: v1(), title: 'learn html', isDone: true, createdAt: Date.now() - 5000},
        {id: v1(), title: 'learn css', isDone: true, createdAt: Date.now() - 4000},
        {id: v1(), title: 'learn js', isDone: true, createdAt: Date.now() - 3000},
        {id: v1(), title: 'learn react', isDone: false, createdAt: Date.now() - 2000},
        {id: v1(), title: 'learn redux', isDone: false, createdAt: Date.now() - 1000},
    ];

    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [sort, setSort] = useState<SortType>('newest');

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false, createdAt: Date.now() };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }
    const editTask = (id: string, newTitle: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id
                ? { ...task, title: newTitle }
                : task
        );
        setTasks(updatedTasks);
    }


    const changeStatus = (taskId: string) => {
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

    const changeSort = (sort: SortType) => {
        setSort(sort);
    };

    let taskForTodoList = [...tasks];

    if (filter === 'completed') {
        taskForTodoList = tasks.filter(task => task.isDone);
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(task => !task.isDone);
    }

    taskForTodoList.sort((a, b) =>
        sort === 'newest'
            ? b.createdAt - a.createdAt
            : a.createdAt - b.createdAt
    );

    return (
        <div className='app-wrapper'>
            <TodoList title='TODO LIST'
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      editTask={editTask}
                      filter={filter}
                      sort={sort}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      changeSort={changeSort}
            />
        </div>
    )
}

export default App;
