import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { fetchTodosThunk } from '@/store/todoSlice.ts';
import { useEffect } from 'react';

export const useRefetchTodos = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state.todos.page);
  const limit = useAppSelector((state) => state.todos.limit);
  const filter = useAppSelector((state) => state.todos.filter);
  const sort = useAppSelector((state) => state.todos.sort);

  useEffect(() => {
    dispatch(fetchTodosThunk({ page, limit, filter, sort }));
  }, [dispatch, page, limit, filter, sort]);
};
