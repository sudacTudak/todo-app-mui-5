import { todosFilterFunction } from '../../helpers/todos-filter-function.helper';
import { TodoListItem } from '../TodoItem/TodoListItem';
import { TodoListProps } from './TodoList.props';
import { Divider, List } from '@mui/material';
import { Fragment } from 'react';

export const TodoList = ({
  todos,
  todosFilter,
  deleteTodo,
  toggleTodo,
  editTodo
}: TodoListProps) => {
  return (
    <List sx={{ maxHeight: '330px', overflowY: 'auto' }}>
      {todosFilterFunction(todos, todosFilter).map((todo) => (
        <Fragment key={todo.id}>
          <TodoListItem
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
