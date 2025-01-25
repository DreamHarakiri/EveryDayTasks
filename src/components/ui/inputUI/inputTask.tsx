import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../service/store';
import styles from './inputTask.module.css';
import { Flag, FlagFill } from 'react-bootstrap-icons';
import { ModalCreateTaskUI } from '../modalCreateTaskUI/modalCreateTaskUI';

interface IInputTaskUI {
  Section: string;
}

export const InputTaskUI: FC<IInputTaskUI> = ({ Section }) => {
  const dispatch: AppDispatch = useDispatch();

  const [modalTest, setModalTest] = useState<boolean>(false);

  const toggleModalCreate = () => {
    setModalTest(!modalTest);
  };

  return (
    <div>
      <button onClick={toggleModalCreate} className={styles.addButton}>
        <span>+</span>Добавить задачу
      </button>
      {modalTest && (
        <ModalCreateTaskUI idSection={Section} onClose={toggleModalCreate} />
      )}
    </div>
  );
};
