import { Todo } from '../../types/todo.interface';

export interface TodoListItemProps {
  todo: Todo;
  deleteTodo: (todoId: string) => void;
  toggleTodo: (todoId: string) => void;
  editTodo: (todoId: string, newTitle: string) => void;
}
