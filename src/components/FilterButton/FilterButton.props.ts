import { ReactNode } from 'react';
import { TodoFilter } from '../../reducers/todos/todos.types';

export interface FilterButtonProps {
  filter: TodoFilter;
  activeFilter: TodoFilter;
  changeFilter: (filter: TodoFilter) => void;
  children: ReactNode;
}
