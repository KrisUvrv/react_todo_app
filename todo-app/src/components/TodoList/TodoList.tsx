import {AddTodo} from "../AddTodo/AddTodo";
import {FilterSortPanel} from "../FilterSortPanel/FilterSortPanel";
import {TodoItem} from "../TodoItem/TodoItem";

import type {TaskType} from "@/types/task";
import type {FilterValuesType, SortType} from "@/types/todo";

import ThemeSwitcher from "@/theme/ThemeSwitcher";

import {Heading, TaskList, TodoListContainer} from "./TodoList.styles";

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
    <TodoListContainer>
      <Heading>
        <h3>{props.title}</h3>
        <ThemeSwitcher/>
      </Heading>


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

      <TaskList>
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
      </TaskList>

    </TodoListContainer>
  )
}

export default TodoList;
