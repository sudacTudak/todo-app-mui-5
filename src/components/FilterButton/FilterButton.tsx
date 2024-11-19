import { Button } from '@mui/material';
import { FilterButtonProps } from './FilterButton.props';

export const FilterButton = ({
  filter,
  activeFilter,
  changeFilter,
  children
}: FilterButtonProps) => {
  return (
    <Button
      variant={filter === activeFilter ? 'contained' : 'outlined'}
      onClick={() => {
        changeFilter(filter);
      }}
    >
      {children}
    </Button>
  );
};
