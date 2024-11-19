import { HTMLAttributes } from 'react';
import { TodoFilter } from '../../reducers/todos/todos.types';
import { Todo } from '../../types/todo.interface';

export interface TodoListProps extends HTMLAttributes<HTMLUListElement> {
  todos: Todo[];
  todosFilter: TodoFilter;
  toggleTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
  editTodo: (todoId: string, newTitle: string) => void;
}
