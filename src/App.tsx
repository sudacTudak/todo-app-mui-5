import { useEffect, useReducer } from 'react';
import { Layout } from './layout/Layout';
import {
  TodosReducer,
  TodosStateInitializer
} from './reducers/todos/todos.reducer';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter, TODOS_ACTIONS } from './reducers/todos/todos.types';
import { AddTodoField } from './components/AddTodoField/AddTodoField';
import { Box, Button, Divider, Typography } from '@mui/material';
import { FilterControls } from './components/FilterControls/FilterControls';
import { LS_TODOS_KEY } from './helpers/constants.helper';

const App = () => {
  const [todosState, dispatchTodos] = useReducer(
    TodosReducer,
    null,
    TodosStateInitializer
  );

  const { todos, activeTodoFilter, totalCount, activeCount } = todosState;

  useEffect(() => {
    if (!todos || todos.length === 0) {
      return;
    }
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoTitle: string) => {
    dispatchTodos({
      type: TODOS_ACTIONS.ADD_TODO,
      payload: { todoTitle }
    });
  };

  const deleteTodo = (todoId: string) => {
    dispatchTodos({
      type: TODOS_ACTIONS.DELETE_TODO,
      payload: { todoId }
    });
  };

  const toggleTodo = (todoId: string) => {
    dispatchTodos({
      type: TODOS_ACTIONS.TOGGLE_TODO,
      payload: { todoId }
    });
  };

  const editTodo = (todoId: string, newTitle: string) => {
    dispatchTodos({
      type: TODOS_ACTIONS.EDIT_TODO,
      payload: {
        newTitle,
        todoId
      }
    });
  };

  const changeTodoFilter = (filter: TodoFilter) => {
    dispatchTodos({
      type: TODOS_ACTIONS.CHANGE_FILTER,
      payload: { filter }
    });
  };

  const deleteCompletedTodos = () => {
    dispatchTodos({
      type: TODOS_ACTIONS.DELETE_COMPLETED
    });
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <AddTodoField addTodo={addTodo} />
        <Box sx={{ flex: '1 0 auto' }}>
          <TodoList
            todos={todos}
            todosFilter={activeTodoFilter}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </Box>
        <Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '10px 5px 0'
            }}
          >
            <Box>
              <Typography color="textSecondary" component="p">
                Items left:&nbsp;
                <Typography component="span" sx={{ fontWeight: 700 }}>
                  {activeCount}/{totalCount}
                </Typography>
              </Typography>
            </Box>
            <FilterControls
              activeFilter={activeTodoFilter}
              changeFilter={changeTodoFilter}
            />
            <Button variant="text" onClick={deleteCompletedTodos}>
              Delete completed
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default App;
