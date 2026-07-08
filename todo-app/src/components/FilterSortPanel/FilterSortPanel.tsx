import {
  ToggleButtons,
  type ToggleButtonsOption,
} from '@/components/ToggleButtons/ToggleButtons.tsx';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { todoActions } from '@/store/todoSlice.ts';
import type { TodoFilter, TodoSort } from '@/types';
import * as S from './FilterSortPanel.styles.ts';

const SORT_OPTIONS: ToggleButtonsOption<TodoSort>[] = [
  {
    value: 'newest',
    title: 'Newest',
  },
  {
    value: 'oldest',
    title: 'Oldest',
  },
];

const FILTER_OPTIONS: ToggleButtonsOption<TodoFilter>[] = [
  {
    value: 'all',
    title: 'All',
  },
  {
    value: 'active',
    title: 'Active',
  },
  {
    value: 'completed',
    title: 'Completed',
  },
];

export const FilterSortPanel = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todos.filter);
  const sort = useAppSelector((state) => state.todos.sort);

  const setFilter = (value: TodoFilter) => {
    dispatch(todoActions.setFilter(value));
  };
  const setSort = (sort: TodoSort) => {
    dispatch(todoActions.setSort(sort));
  };

  return (
    <S.FilterSortPanelContainer>
      <ToggleButtons
        exclusive
        value={sort}
        onOptionChange={setSort}
        options={SORT_OPTIONS}
      />
      <ToggleButtons
        exclusive
        color="primary"
        value={filter}
        onOptionChange={setFilter}
        options={FILTER_OPTIONS}
      />
    </S.FilterSortPanelContainer>
  );
};
