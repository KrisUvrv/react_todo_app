import TodoList from "./components/TodoList/TodoList.tsx";
import type {FilterValuesType, SortType} from "./types/todo.ts";
import type {TaskType} from "./types/task.ts";
import {useLocalStorage} from "./utils/useLocalStorage.hook.ts";
import {AppWrapper} from './App.styles';

const App = () => {

  const [filter, setFilter] = useLocalStorage<FilterValuesType>('filter', 'all');
  const [sort, setSort] = useLocalStorage<SortType>('sort', 'newest');
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', []);

  const addTask = (title: string) => {
    setTasks([
      {
        id: crypto.randomUUID(),
        title,
        isDone: false,
        createdAt: Date.now(),
      },
      ...tasks,
    ]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const editTask = (id: string, newTitle: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? {...task, title: newTitle}
        : task
    );
    setTasks(updatedTasks);
  }


  const changeStatus = (taskId: string) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? {...task, isDone: !task.isDone}
          : task
      )
    );
  };

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
    <AppWrapper>
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
    </AppWrapper>
  )
}

export default App;
