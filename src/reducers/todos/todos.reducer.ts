import { v6 as uuidv6 } from 'uuid';
import { Todo, TodoStatus } from '../../types/todo.interface';
import { TodoAction, TODOS_ACTIONS, TodosState } from './todos.types';

export const INITIAL_TODOS_STATE: TodosState = {
  todos: [],
  totalCount: 0,
  activeCount: 0,
  activeTodoFilter: null
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
