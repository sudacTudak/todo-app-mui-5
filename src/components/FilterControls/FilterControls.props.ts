import { TodoFilter } from '../../reducers/todos/todos.types';

export interface FilterControlsProps {
  changeFilter: (filter: TodoFilter) => void;
  activeFilter: TodoFilter;
}
