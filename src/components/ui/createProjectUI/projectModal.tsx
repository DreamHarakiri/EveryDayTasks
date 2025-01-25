import { FC, useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../service/store';
import { addProject } from '../../../service/slices/project.slice';
import { getUserData } from '../../../service/slices/user.slice';
import styles from './projectModal.module.css';
import { addProjectData } from '../../../service/Asyncs/project';
import { nanoid } from '@reduxjs/toolkit';
interface IProjectModal {
  onClose: () => void;
}

export const ProjectModal: FC<IProjectModal> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const userName = useSelector(getUserData);
  const owner = userName?.name;
  const id = nanoid();

  const createProject = () => {
    dispatch(addProjectData({ id, name, owner }));
    onClose();
  };

  return (
    <>
      <div className={styles.panelModal}>
        <XLg
          className={styles.closeIcon}
          fill='black'
          onClick={onClose}
          size={25}
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Введите название проекта'
        />
        <button type='submit' onClick={createProject}>
          Создать проект
        </button>
      </div>
    </>
  );
};
