import { FC, useState } from 'react';
import styles from './editProjectUI.module.css';
import { useSelector } from 'react-redux';
import { getCurrentProject } from '../../../service/slices/project.slice';
import { RootState } from '../../../service/store';
import { XLg } from 'react-bootstrap-icons';

export interface IEditProjectUI {
  id: number | string;
  isVisible: boolean;
  onClose: () => void;
}

export const EditProjectUI: FC<IEditProjectUI> = ({ id, isVisible, onClose }) => {
  const currentProject = useSelector((state: RootState) =>
    getCurrentProject(state, id)
  );
  const [getNameProject, setNameProject] = useState<string | undefined>(
    undefined
  );

  const changeProjectData = () => {
    getNameProject?.trim()
      ? console.log('Новое имя проекта:', getNameProject)
      : console.log('Имя проекта не указано');
  };

  const closeModal = () => {
    console.log('Закрыть модалку');
  };

  return (
    isVisible && (
      <div className={styles.overlay}>
        <div className={styles.containerEdit}>
          <div className={styles.containerHeader}>
            <h1 className={styles.title}>Редактирование проекта</h1>
            <button className={styles.closeButton} onClick={() => onClose()}>
              <XLg size={20} />
            </button>
          </div>

          <p>Название проекта</p>
          <input
            className={styles.input}
            type='text'
            onChange={(e) => setNameProject(e.currentTarget.value)}
            placeholder={currentProject?.name}
            value={getNameProject}
          />
          <button className={styles.button} onClick={changeProjectData}>Сохранить изменения</button>
        </div>
      </div>
    )
  );
};
