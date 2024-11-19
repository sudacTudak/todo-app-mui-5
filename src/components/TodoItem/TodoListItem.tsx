import {
  Checkbox,
  ClickAwayListener,
  IconButton,
  Input,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { TodoListItemProps as TodoListItemProps } from './TodoListItem.props';
import { Delete, Done } from '@mui/icons-material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export const TodoListItem = ({
  todo,
  deleteTodo,
  toggleTodo,
  editTodo
}: TodoListItemProps) => {
  const { id, status, title } = todo;
  const [isInputEditable, setIsInputEditable] = useState(false);
  const [inputValue, setInputValue] = useState<string>(title);

  const changeInputMode = () => {
    if (status === 'active') {
      setIsInputEditable(true);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggle = () => {
    if (isInputEditable) {
      return;
    }
    toggleTodo(id);
  };

  const handleEdit = () => {
    setIsInputEditable(false);

    if (!inputValue.trim()) {
      setInputValue(title);
      return;
    }

    if (inputValue === title) {
      return;
    }

    editTodo(id, inputValue);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const itemSecondaryAction = (
    <IconButton
      edge="end"
      onClick={isInputEditable ? handleEdit : handleDelete}
    >
      {isInputEditable ? <Done /> : <Delete />}
    </IconButton>
  );

  return (
    <ListItem secondaryAction={itemSecondaryAction}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          checked={status === 'completed'}
          onChange={handleToggle}
        />
      </ListItemIcon>
      <ClickAwayListener onClickAway={handleEdit} mouseEvent={'onMouseDown'}>
        <Input
          fullWidth
          disabled={status === 'completed'}
          readOnly={!isInputEditable}
          disableUnderline={!isInputEditable}
          value={inputValue}
          onChange={handleInputTitle}
          onClick={changeInputMode}
          onKeyDown={handleInputKeyDown}
          sx={{
            textDecoration: status === 'completed' ? 'line-through' : 'none'
          }}
        />
      </ClickAwayListener>
    </ListItem>
  );
};
