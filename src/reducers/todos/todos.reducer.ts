import { TodoAction, TodosState } from './todos.types';

export const INITIAL_TODOS_STATE: TodosState = {
  todos: [],
  totalCount: 0,
  activeCount: 0,
  activeTodoFilter: null
};

export const TodosReducer = (state: TodosState, action: TodoAction) => {};
