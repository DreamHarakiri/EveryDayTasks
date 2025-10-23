import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProjectData } from '../../../service/Asyncs/project';
import { AppDispatch } from '../../../service/store';
import styles from './projectCardUI.module.css';
import { getUserEmail } from '../../../service/slices/user.slice';
import { Link, Navigate } from 'react-router-dom';
import { Bucket, Trash } from 'react-bootstrap-icons';
import { EditProjectUI } from '../editProjectUI/editProjectUI';

export interface IProjectCardUI {
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

  const [getOpenEdit, setOpenEdit] = useState<boolean>(false);

  return (
    <div className={styles.div}>
      <div>
        <Link className={styles.link} to={id}>
          <h1>{name}</h1>
        </Link>
        <p>Владелец: {userEmail === owner ? 'Вы' : owner}</p>
      </div>
      <div className={styles.containerButton}>
        <button
          className={styles.editProject}
          onClick={() => {
            setOpenEdit(!getOpenEdit);
          }}
        >
          Редактировать
        </button>
        <button onClick={removeProject}>
          <Trash fill='white' size={25} />
        </button>
      </div>
      <EditProjectUI onClose={() => setOpenEdit(!getOpenEdit)} id={id} isVisible={getOpenEdit} />
    </div>
  );
};
