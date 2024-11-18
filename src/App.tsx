import { useEffect, useReducer } from 'react';
import { Layout } from './layout/Layout';
import {
  TodosReducer,
  TodosStateInitializer
} from './reducers/todos/todos.reducer';
import { LS_TODOS_KEY } from './helpers/constants.helper';

const App = () => {
  const [todos, dispatchTodos] = useReducer(
    TodosReducer,
    null,
    TodosStateInitializer
  );

  useEffect(() => {
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
  }, [todos]);
  return <Layout></Layout>;
};

export default App;
