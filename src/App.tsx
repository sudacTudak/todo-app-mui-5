import { useEffect, useReducer } from 'react';
import { Layout } from './layout/Layout';
import {
  TodosReducer,
  TodosStateInitializer
} from './reducers/todos/todos.reducer';
import { TodoList } from './components/TodoList/TodoList';
import { TODOS_ACTIONS } from './reducers/todos/todos.types';
import { AddTodoField } from './components/AddTodoField/AddTodoField';
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

  return (
    <Layout>
      <AddTodoField addTodo={addTodo} />
      <TodoList
        todos={todos}
        todosFilter={activeTodoFilter}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </Layout>
  );
};

export default App;
