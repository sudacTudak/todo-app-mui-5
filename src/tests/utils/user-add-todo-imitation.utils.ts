import { screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';

export const userAddTodoImitation = async (
  user: UserEvent,
  ...userInputs: string[]
) => {
  const addTodoField = screen.getByPlaceholderText(/type your todo/i);
  const addTodoBtn = screen.getByRole('button', { name: /add/i });

  for (const userInput of userInputs) {
    if (userInput) {
      await user.type(addTodoField, userInput);
    }
    await user.click(addTodoBtn);
  }
};