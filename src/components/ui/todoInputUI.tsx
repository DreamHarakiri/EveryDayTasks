import { nanoid } from '@reduxjs/toolkit';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from '../../service/slices/user.slice';
import { AppDispatch } from '../../service/store';
import { addTodoData } from '../../service/Asyncs/todo';

interface ITodoInputUI {
  idProject: string;
  onClose: () => void;
}

export const TodoInputUI: FC<ITodoInputUI> = ({ idProject, onClose }) => {
  const [NameInput, setNameInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const userOwner = useSelector(getUserEmail);
  const idTask = nanoid();

  const dispatch: AppDispatch = useDispatch();

  const addNewTodo = () => {
    if (typeof userOwner === 'string') {
      dispatch(
        addTodoData({
          id: idTask,
          title: NameInput,
          parent: idProject,
          created: userOwner,
          checked: false
        })
      );
    }
  };
  return (
    <>
      <div>
        <input type='text' onChange={(e) => setNameInput(e.target.value)} />

        <button onClick={addNewTodo}>Добавить список</button>
      </div>
    </>
  );
};
