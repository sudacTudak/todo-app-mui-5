import { v6 as uuidv6 } from 'uuid';
import { Todo, TodoStatus } from '../../types/todo.interface';
import { TodoAction, TODOS_ACTIONS, TodosState } from './todos.types';
import { LS_TODOS_KEY } from '../../helpers/constants.helper';

export const INITIAL_TODOS_STATE: TodosState = {
  todos: [],
  totalCount: 0,
  activeCount: 0,
  activeTodoFilter: null
};

export const TodosStateInitializer = () => {
  const lsKey = LS_TODOS_KEY;
  const lsTodosData = localStorage.getItem(lsKey);

  if (!lsTodosData) {
    return INITIAL_TODOS_STATE;
  }

  try {
    const todosState: TodosState = {
      ...INITIAL_TODOS_STATE,
      todos: JSON.parse(lsTodosData)
    };

    return todosState;
  } catch {
    console.error(
      `Invalid JSON data in the local storage by the '${lsKey}' key`
    );
    return INITIAL_TODOS_STATE;
  }
};

export const TodosReducer = (state: TodosState, action: TodoAction) => {
  switch (action.type) {
    case TODOS_ACTIONS.SET_TODOS: {
      const todos = action.payload;
      const totalCount = todos.length;
      const activeCount =
        totalCount - todos.filter((todo) => todo.status === 'completed').length;

      return {
        ...state,
        todos,
        totalCount,
        activeCount
      };
    }
    case TODOS_ACTIONS.ADD_TODO: {
      const { todoTitle } = action.payload;

      if (!todoTitle.trim()) {
        return state;
      }

      const newTodo: Todo = {
        id: uuidv6(),
        title: todoTitle,
        status: 'active'
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        totalCount: state.totalCount + 1,
        activeCount: state.activeCount + 1
      };
    }
    case TODOS_ACTIONS.TOGGLE_TODO: {
      const { todoId } = action.payload;
      let newStatus: TodoStatus = 'active';

      const changedTodos = state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        newStatus = todo.status === 'active' ? 'completed' : 'active';
        return { ...todo, status: newStatus };
      });

      return {
        ...state,
        todos: changedTodos,
        activeCount:
          newStatus === 'active' ? state.activeCount + 1 : state.activeCount - 1
      };
    }
    case TODOS_ACTIONS.EDIT_TODO: {
      const { todoId, newTitle } = action.payload;
      const todos = state.todos;

      if (!newTitle.trim()) {
        return state;
      }

      const existedTodoIndex = todos.findIndex((todo) => todo.id === todoId);

      if (
        existedTodoIndex === -1 ||
        todos[existedTodoIndex]?.title === newTitle
      ) {
        return state;
      }

      const newTodo: Todo = {
        ...todos[existedTodoIndex],
        title: newTitle
      };

      const newTodoArray = Object.assign([], todos);
      newTodoArray.splice(existedTodoIndex, 1, newTodo);

      return {
        ...state,
        todos: newTodoArray
      };
    }
    case TODOS_ACTIONS.DELETE_TODO: {
      const { todoId } = action.payload;

      const deletedTodo = state.todos.find((todo) => todo.id === todoId);

      if (!deletedTodo) {
        return state;
      }

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== todoId),
        totalCount: state.totalCount - 1,
        activeCount:
          deletedTodo.status === 'active'
            ? state.activeCount - 1
            : state.activeCount
      };
    }
    case TODOS_ACTIONS.DELETE_COMPLETED: {
      let deletedTodosCount = 0;
      const filteredTodos = state.todos.filter((todo) => {
        if (todo.status !== 'completed') {
          return todo;
        }
        deletedTodosCount++;
      });

      return {
        ...state,
        todos: filteredTodos,
        totalCount: state.totalCount - deletedTodosCount
      };
    }
    case TODOS_ACTIONS.CHANGE_FILTER: {
      return {
        ...state,
        activeTodoFilter: action.payload.filter
      };
    }
    default:
      return state;
  }
};
