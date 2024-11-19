import { Todo, TodoStatus } from '../../types/todo.interface';

export type TodoFilter = TodoStatus | null;

export interface TodosState {
  todos: Todo[];
  activeTodoFilter: TodoFilter;
  totalCount: number;
  activeCount: number;
}

export enum TODOS_ACTIONS {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  CHANGE_FILTER = 'CHANGE_FILTER',
  DELETE_COMPLETED = 'DELETE_COMPLETED'
}

export interface SetTodosAction {
  type: TODOS_ACTIONS.SET_TODOS;
  payload: Todo[];
}

export interface AddTodoAction {
  type: TODOS_ACTIONS.ADD_TODO;
  payload: {
    todoTitle: string;
  };
}

export interface DeleteTodoAction {
  type: TODOS_ACTIONS.DELETE_TODO;
  payload: {
    todoId: string;
  };
}

export interface ToggleTodoAction {
  type: TODOS_ACTIONS.TOGGLE_TODO;
  payload: {
    todoId: string;
  };
}

export interface EditTodoAction {
  type: TODOS_ACTIONS.EDIT_TODO;
  payload: {
    todoId: string;
    newTitle: string;
  };
}

export interface ChangeFilterAction {
  type: TODOS_ACTIONS.CHANGE_FILTER;
  payload: {
    filter: TodoFilter;
  };
}

export interface DeleteCompletedAction {
  type: TODOS_ACTIONS.DELETE_COMPLETED;
}

export type TodoAction =
  | SetTodosAction
  | AddTodoAction
  | DeleteTodoAction
  | ToggleTodoAction
  | EditTodoAction
  | ChangeFilterAction
  | DeleteCompletedAction;
