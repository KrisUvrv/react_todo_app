import { TodoItem } from '@/components/TodoItem/TodoItem.tsx';
import * as S from '@/components/TodoList/TodoList.styles.ts';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { todoActions } from '@/store/todoSlice.ts';

export const Todolist = () => {

  const tasks = useAppSelector((state) => state.todos.tasks);
  const editingTodoId = useAppSelector((state) => state.todos.editingTodoId);

  const dispatch = useAppDispatch();

  const onEditClick = (id: number) => {
    dispatch(todoActions.startEditing(id));
  };

  return (
    <S.TaskList>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} isEditing={task.id === editingTodoId} onEditClick={onEditClick} />
      ))}
    </S.TaskList>
  );
};
