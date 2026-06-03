import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type {FilterValuesType, SortType} from "../../types/todo.ts";
import './FilterSortPanel.css';

type Props = {
    filter: FilterValuesType;
    sort: SortType;

    changeFilter: (value: FilterValuesType) => void;
    changeSort: (value: SortType) => void;
}

export const FilterSortPanel = ({
                                    filter,
                                    sort,
                                    changeFilter,
                                    changeSort,
                                }: Props) => {

    return (
        <div className={'filter-sort-panel'}>
            <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={(_, value: SortType | null) => {
                    if (value) {
                        changeSort(value);
                    }
                }}
            >
                <ToggleButton value="newest">
                    Newest
                </ToggleButton>

                <ToggleButton value="oldest">
                    Oldest
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
                color="primary"
                value={filter}
                exclusive
                onChange={(_, value: FilterValuesType | null) => {
                    if (value) {
                        changeFilter(value);
                    }
                }}
            >
                <ToggleButton value="all">
                    All
                </ToggleButton>

                <ToggleButton value="active">
                    Active
                </ToggleButton>

                <ToggleButton value="completed">
                    Completed
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};
