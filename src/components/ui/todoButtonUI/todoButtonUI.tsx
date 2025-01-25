import { FC, useState } from 'react';
import styles from './todoButton.module.css';
import { TodoInputUI } from '../todoInputUI';

interface ITodoButtonUI {
  idProject: string;
}

export const TodoButtonUI: FC<ITodoButtonUI> = ({ idProject }) => {
  const [modal, setModal] = useState<boolean>(false);

  const handleInputUI = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={handleInputUI} className={styles.button}>
        <span>+</span>Добавить список
      </button>
      {modal && <TodoInputUI onClose={handleInputUI} idProject={idProject} />}
    </>
  );
};
