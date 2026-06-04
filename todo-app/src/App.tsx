import TodoList from "./components/TodoList/TodoList.tsx";
import {v1} from "uuid";
import type {FilterValuesType, SortType} from "./types/todo.ts";
import type {TaskType} from "./types/task.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.hook.ts";

const App = () => {

    const [filter, setFilter] = useLocalStorage<FilterValuesType>('filter', 'all');
    const [sort, setSort] = useLocalStorage<SortType>('sort', 'newest');
    const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', []);

    const addTask = (title: string) => {
        const newTask: TaskType = { id: v1(), title: title, isDone: false, createdAt: Date.now() };
        const newTasks: TaskType[] = [newTask, ...tasks];
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
