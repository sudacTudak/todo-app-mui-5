import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LS_TODOS_TEST_KEY } from './utils/constants.utils';
import { TodoList } from '../components/TodoList/TodoList';
import { FilterControls } from '../components/FilterControls/FilterControls';
import { TodoFilter } from '../reducers/todos/todos.types';
import { Todo } from '../types/todo.interface';

vi.mock('./helpers/constants.helper.ts', () => ({
  LS_TODOS_KEY: LS_TODOS_TEST_KEY
}));

describe('TodoList and TodoFilter integration', () => {
  const mockTodos: Todo[] = [
    { id: '1', title: 'Task 1', status: 'active' },
    { id: '2', title: 'Task 2', status: 'completed' },
    { id: '3', title: 'Task 3', status: 'active' }
  ];

  let activeFilter: TodoFilter = null;

  const filteredTodos = () =>
    activeFilter
      ? mockTodos.filter((todo) => todo.status === activeFilter)
      : mockTodos;

  const changeFilterMock = vi.fn((filter) => {
    activeFilter = filter;
    cleanup();
    renderList();
  });

  const renderList = () =>
    render(
      <>
        <TodoList
          todos={filteredTodos()}
          todosFilter={activeFilter}
          deleteTodo={vi.fn()}
          editTodo={vi.fn()}
          toggleTodo={vi.fn()}
        />
        <FilterControls
          activeFilter={activeFilter}
          changeFilter={changeFilterMock}
        />
      </>
    );

  afterEach(() => {
    activeFilter = null;
    cleanup();
  });

  it('should display all todos by default', async () => {
    renderList();

    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
  });

  it('should display all todos when "All" filter is selected', async () => {
    const user = userEvent.setup();
    renderList();

    await user.click(screen.getByRole('button', { name: /all/i }));
    const todos = screen.getAllByTestId('todo-item');

    expect(changeFilterMock).toHaveBeenCalledWith(null);
    expect(todos).toHaveLength(3);
  });

  it('should display only active todos when "Active" filter is selected', async () => {
    const user = userEvent.setup();
    renderList();

    await user.click(screen.getByRole('button', { name: /active/i }));
    const todos = screen.getAllByTestId('todo-item');

    expect(changeFilterMock).toHaveBeenCalledWith('active');
    expect(todos).toHaveLength(2);
  });

  it('should display only completed todos when "Completed" filter is selected', async () => {
    const user = userEvent.setup();
    renderList();

    await user.click(screen.getByRole('button', { name: /completed/i }));
    const todos = screen.getAllByTestId('todo-item');

    expect(changeFilterMock).toHaveBeenCalledWith('completed');
    expect(todos).toHaveLength(1);
  });
});
