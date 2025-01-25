import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectModal } from '../createProjectUI/projectModal';
import styles from './projectUI.module.css';

export const ButtonAddUI = () => {
  const dispatch = useDispatch();
  const [stateModal, setStateModal] = useState<boolean>(false);

  const onCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleProjectsAdd = () => {
    setStateModal(true);
  };
  return (
    <>
      <div onClick={handleProjectsAdd} className={styles.button}>
        <div className={styles.buttonPlus}>+</div>
        <p className={styles.text}>Добавить проект</p>
      </div>
      {stateModal && <ProjectModal onClose={onCloseModal} />}
    </>
  );
};
