import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProjectData } from '../../../service/Asyncs/project';
import { AppDispatch } from '../../../service/store';
import styles from './projectCardUI.module.css';
import { getUserEmail } from '../../../service/slices/user.slice';
import { Link, Navigate } from 'react-router-dom';
import { Bucket, Trash } from 'react-bootstrap-icons';

interface IProjectCardUI {
  id: string;
  name: string;
  owner?: string;
}

export const ProjectCardUI: React.FC<IProjectCardUI> = ({
  id,
  name,
  owner
}) => {
  const userEmail = useSelector(getUserEmail);
  const dispatch: AppDispatch = useDispatch();
  const removeProject = () => {
    dispatch(removeProjectData(id));
  };

  return (
    <div className={styles.div}>
      <div>
        <Link className={styles.link} to={id}>
          <h1>{name}</h1>
        </Link>
        <p>Владелец: {userEmail === owner ? 'Вы' : owner}</p>
      </div>
      <div className={styles.containerButton}>
        <a href='#'>Редактровать</a>
        <button onClick={removeProject}>
          <Trash fill='white' size={25} />
        </button>
      </div>
    </div>
  );
};
