import './TodoList.css';
import {AddTodo} from "../AddTodo/AddTodo.tsx";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import {FilterSortPanel} from "../FilterSortPanel/FilterSortPanel.tsx";
import type {TaskType} from "../../types/task.ts";
import type {FilterValuesType, SortType} from "../../types/todo.ts";
import ThemeSwitcher from "../../theme/ThemeSwitcher.tsx";

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

    return (
        <div className='todolist'>
            <div className='heading'>
                <h3>{props.title}</h3>
                <ThemeSwitcher />
            </div>


            <AddTodo
                addTask={props.addTask}
                tasks={props.tasks}
            />

            <FilterSortPanel
                filter={props.filter}
                sort={props.sort}
                changeFilter={props.changeFilter}
                changeSort={props.changeSort}
            />

            <ul>
                {props.tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        tasks={props.tasks}
                        removeTask={props.removeTask}
                        editTask={props.editTask}
                        changeStatus={props.changeStatus}
                    />
                ))}
            </ul>

        </div>
    )
}

export default TodoList;
