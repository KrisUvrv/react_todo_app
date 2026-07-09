import { TodoItem } from '@/components/TodoItem/TodoItem.tsx';
import * as S from '@/components/TodoList/TodoList.styles.ts';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { deleteTodoThunk, todoActions, toggleTodoThunk, updateTodoThunk, } from '@/store/todoSlice.ts';
export const Todolist = () => {
    const tasks = useAppSelector((state) => state.todos.tasks);
    const editingTodoId = useAppSelector((state) => state.todos.editingTodoId);
    const dispatch = useAppDispatch();
    const onEditClick = (id) => {
        dispatch(todoActions.startEditing(id));
    };
    const onSave = async (id, title) => {
        await dispatch(updateTodoThunk({
            id,
            payload: {
                text: title,
            },
        })).unwrap();
    };
    const onDelete = (id) => {
        dispatch(deleteTodoThunk(id));
    };
    const onCloseEdit = () => {
        dispatch(todoActions.stopEditing());
    };
    const clearServerError = () => {
        dispatch(todoActions.clearError());
    };
    const onToggleTodo = (id) => {
        dispatch(toggleTodoThunk(id));
    };
    return (<S.TaskList>
      {tasks.map((task) => (<TodoItem key={task.id} task={task} isEditing={task.id === editingTodoId} onEditClick={onEditClick} onSave={onSave} onDelete={onDelete} onCloseEdit={onCloseEdit} clearServerError={clearServerError} toggleTodo={onToggleTodo}/>))}
    </S.TaskList>);
};
