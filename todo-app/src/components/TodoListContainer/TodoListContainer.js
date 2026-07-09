import { PaginationControls } from '@/components/Pagination/PaginationControls.tsx';
import { AddTodo } from '../AddTodo/AddTodo.tsx';
import { FilterSortPanel } from '../FilterSortPanel/FilterSortPanel.tsx';
import { Todolist } from '@/components/TodoList/Todolist.tsx';
import { TodoListHeader } from '@/components/TodoListHeader/TodoListHeader.tsx';
import { useRefetchTodos } from '@/utils/useRefetchTodos.hook.ts';
import * as S from '../TodoList/TodoList.styles.ts';
const TodoListContainer = () => {
    useRefetchTodos();
    return (<S.TodoListContainer>
      <TodoListHeader />
      <AddTodo />
      <FilterSortPanel />
      <Todolist />
      <PaginationControls />
    </S.TodoListContainer>);
};
export default TodoListContainer;
