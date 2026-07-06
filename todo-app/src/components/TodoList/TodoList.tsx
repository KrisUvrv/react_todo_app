import { PaginationControls } from '@/components/Pagination/PaginationControls.tsx';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { fetchTodosThunk } from '@/store/todoSlice.ts';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useEffect } from 'react';
import { AddTodo } from '../AddTodo/AddTodo';
import { FilterSortPanel } from '../FilterSortPanel/FilterSortPanel';
import { TodoItem } from '../TodoItem/TodoItem';
import { Heading, TaskList, TodoListContainer } from './TodoList.styles';

const TodoList = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.todos.tasks);
  const page = useAppSelector((state) => state.todos.page);
  const limit = useAppSelector((state) => state.todos.limit);
  const filter = useAppSelector((state) => state.todos.filter);
  const sort = useAppSelector((state) => state.todos.sort);

  useEffect(() => {
    dispatch(fetchTodosThunk({ page, limit, filter, sort }));
  }, [dispatch, page, limit, filter, sort]);

  return (
    <TodoListContainer>
      <Heading>
        <h3>TODO LIST</h3>
        <ThemeSwitcher />
      </Heading>

      <AddTodo />

      <FilterSortPanel />

      <TaskList>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </TaskList>

      <PaginationControls />
    </TodoListContainer>
  );
};

export default TodoList;
