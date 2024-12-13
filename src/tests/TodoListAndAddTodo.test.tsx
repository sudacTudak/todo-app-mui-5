import { render, cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { userAddTodoImitation } from './utils/user-add-todo-imitation.utils';
import { LS_TODOS_TEST_KEY } from './utils/constants.utils';

vi.mock('./helpers/constants.helper.ts', () => ({
  LS_TODOS_KEY: LS_TODOS_TEST_KEY
}));

describe('TodoList with AddTodoField integration tests', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('should have empty TodoList after initial render', () => {
    render(<App />);
    const todos = screen.queryAllByTestId('todo-item');

    expect(todos).toHaveLength(0);
  });

  it('should not render todo when user input nothing in AddTodoField', async () => {
    render(<App />);
    const userInput = '';
    const user = userEvent.setup();

    await userAddTodoImitation(user, userInput);

    const todos = screen.queryAllByTestId('todo-item');
    expect(todos).toHaveLength(0);
  });

  it('should not render todo when user input only spaces in AddTodoField', async () => {
    render(<App />);
    const userInput = '     ';
    const user = userEvent.setup();

    await userAddTodoImitation(user, userInput);

    const todos = screen.queryAllByTestId('todo-item');
    expect(todos).toHaveLength(0);
  });

  it('should render one todo in TodoList when user input something in AddTodoField', async () => {
    render(<App />);
    const userInput = 'Write some tests';
    const user = userEvent.setup();

    await userAddTodoImitation(user, userInput);

    const todos = await screen.findAllByTestId('todo-item');
    const todoInput = within(todos[0]).getByDisplayValue(userInput);

    expect(todos).toHaveLength(1);
    expect(todoInput).toBeInTheDocument();
  });

  it('should render several todos in TodoList when user input in AddTodoField several times', async () => {
    render(<App />);
    const userInputs = ['Write test №1', 'Write test №2', 'Write test №3'];
    const user = userEvent.setup();

    await userAddTodoImitation(user, ...userInputs);

    const todos = await screen.findAllByTestId('todo-item');
    expect(todos).toHaveLength(3);
    userInputs.forEach((input, index) => {
      const todoInput = within(todos[index]).getByDisplayValue(input);
      expect(todoInput).toBeInTheDocument();
    });
  });
});
