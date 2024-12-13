import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { userAddTodoImitation } from './utils/user-add-todo-imitation.utils';
import { LS_TODOS_TEST_KEY } from './utils/constants.utils';

vi.mock('./helpers/constants.helper.ts', () => ({
  LS_TODOS_KEY: LS_TODOS_TEST_KEY
}));

describe('TodoListItem functionality tests', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('should toggle todo status when checkbox is clicked', async () => {
    render(<App />);
    const userInput = 'Write tests';

    const user = userEvent.setup();
    await userAddTodoImitation(user, userInput);

    const todoCheckbox = screen.getByRole('checkbox');
    expect(todoCheckbox).not.toBeChecked();

    await user.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();

    await user.click(todoCheckbox);
    expect(todoCheckbox).not.toBeChecked();
  });

  it('should delete a todo when user click delete button', async () => {
    render(<App />);
    const userInput = 'Write tests';

    const user = userEvent.setup();
    await userAddTodoImitation(user, userInput);

    const todoItem = screen.getByTestId('todo-item');
    const deleteItemButton = screen.getByTestId('todo-delete-btn');
    await user.click(deleteItemButton);

    expect(todoItem).not.toBeInTheDocument();
  });

  it('should edit an existed todo title', async () => {
    render(<App />);

    const oldTitle = 'Write tests';
    const newTitle = 'Write one more test';

    const user = userEvent.setup();
    await userAddTodoImitation(user, oldTitle);

    const todoInput = screen.getByDisplayValue(oldTitle);
    await user.click(todoInput);
    await user.clear(todoInput);
    await user.type(todoInput, newTitle);
    await user.keyboard('{Enter}');

    expect(todoInput).not.toHaveDisplayValue(oldTitle);
    expect(todoInput).toHaveDisplayValue(newTitle);
  });
});
