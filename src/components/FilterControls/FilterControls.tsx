import { Box, ButtonGroup } from '@mui/material';
import { FilterControlsProps } from './FilterControls.props';
import { FilterButton } from '../FilterButton/FilterButton';

export const FilterControls = ({
  activeFilter,
  changeFilter
}: FilterControlsProps) => {
  return (
    <Box>
      <ButtonGroup>
        <FilterButton
          filter={'active'}
          activeFilter={activeFilter}
          changeFilter={changeFilter}
        >
          Active
        </FilterButton>
        <FilterButton
          filter={'completed'}
          activeFilter={activeFilter}
          changeFilter={changeFilter}
        >
          Completed
        </FilterButton>
        <FilterButton
          filter={null}
          activeFilter={activeFilter}
          changeFilter={changeFilter}
        >
          All
        </FilterButton>
      </ButtonGroup>
    </Box>
  );
};
