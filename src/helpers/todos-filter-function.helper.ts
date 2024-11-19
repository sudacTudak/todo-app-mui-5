import { TodoFilter } from '../reducers/todos/todos.types';
import { Todo } from '../types/todo.interface';

export const todosFilterFunction = (todos: Todo[], todoFilter: TodoFilter) => {
  if (!todoFilter) {
    return todos;
  }

  return todos.filter((todo) => todo.status === todoFilter);
};
