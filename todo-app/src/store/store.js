import { todoSlice } from '@/store/todoSlice.ts';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
    },
});
export const useAppSelector = useSelector.withTypes();
export const useAppDispatch = useDispatch.withTypes();
