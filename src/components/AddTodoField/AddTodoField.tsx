import { Button, InputBase, Paper } from '@mui/material';
import { AddTodoFieldProps } from './AddTodoField.props';
import { ChangeEvent, FormEvent, useState } from 'react';

export const AddTodoField = ({ addTodo }: AddTodoFieldProps) => {
  const [value, setValue] = useState<string>('');

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value);
    }
    setValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleAddTodo}
      sx={{ display: 'flex', alignItems: 'center', p: '2px 4px' }}
    >
      <InputBase
        value={value}
        onChange={handleChange}
        placeholder="Type your todo"
        sx={{ ml: 1, flex: 1 }}
      />
      <Button type="submit" sx={{ p: '10px' }}>
        Add
      </Button>
    </Paper>
  );
};
