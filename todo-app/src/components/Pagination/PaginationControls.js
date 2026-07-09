import { todoActions } from '@/store/todoSlice.ts';
import { FormControl, InputLabel, MenuItem, Pagination, Select, } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './PaginationControls.styles';
export const PaginationControls = () => {
    const dispatch = useDispatch();
    const { page, totalPages, limit } = useSelector((s) => s.todos);
    const handlePageChange = (_, value) => {
        dispatch(todoActions.setPage(value));
    };
    const handleLimitChange = (e) => {
        dispatch(todoActions.setLimit(Number(e.target.value)));
    };
    return (<>
      {totalPages > 0 && (<S.PaginationContainer>
          <Pagination count={totalPages} page={page} onChange={handlePageChange}/>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Limit</InputLabel>
            <Select value={limit} label="Limit" onChange={handleLimitChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </S.PaginationContainer>)}
    </>);
};
