import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { todoActions } from '@/store/todoSlice.ts';
import type { TodoFilter, TodoSort } from '@/types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterSortPanelContainer } from './FilterSortPanel.styles.ts';

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
    <FilterSortPanelContainer>
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={(_, value: TodoSort | null) => {
          if (value) {
            setSort(value);
          }
        }}
      >
        <ToggleButton value="newest">Newest</ToggleButton>

        <ToggleButton value="oldest">Oldest</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={(_, filter: TodoFilter | null) => {
          if (filter) {
            setFilter(filter);
          }
        }}
      >
        <ToggleButton value="all">All</ToggleButton>

        <ToggleButton value="active">Active</ToggleButton>

        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>
    </FilterSortPanelContainer>
  );
};
