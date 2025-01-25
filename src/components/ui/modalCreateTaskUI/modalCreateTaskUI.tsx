import { FC, useState } from 'react';
import { X } from 'react-bootstrap-icons';
import styles from './modalCreateTaskUI.module.css';
import { AppDispatch } from '../../../service/store';
import { useDispatch } from 'react-redux';
import { addTaskData } from '../../../service/Asyncs/task';
import { nanoid } from '@reduxjs/toolkit';

interface IModalCreateTaskUI {
  idSection: string;
  onClose: () => void;
}

export const ModalCreateTaskUI: FC<IModalCreateTaskUI> = ({
  onClose,
  idSection
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const dispatch: AppDispatch = useDispatch();

  const closeWin = () => {
    onClose();
  };

  const onSubmitForm = () => {
    dispatch(
      addTaskData({
        id: nanoid(),
        title: title,
        description: description,
        parent: idSection,
        color: color,
        date: date,
        checked: false
      })
    );
    onClose();
  };

  return (
    <div className={styles.overlayModal}>
      <div className={styles.contentContext}>
        <div className={styles.headerContainer}>
          <h1>Создание задачи</h1>
          <button onClick={closeWin}>
            <X size={45} />
          </button>
        </div>
        <p className={styles.headerContext}>Заголовок задачи</p>
        <input
          className={styles.largeInput}
          type='text'
          placeholder='Введите название задачи'
          maxLength={128}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.containerInput}>
          <p className={styles.headerContext}>Содержание задачи</p>
          <textarea
            name=''
            id=''
            className={styles.maxInput}
            placeholder='Введите содержимое задачи'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.paramsContainer}>
          <div>
            <p className={styles.headerContext}>Цвет задачи</p>
            <div className={styles.colorTasks}>
              <div onClick={() => setColor('#000000')} />
              <div
                onClick={() => setColor('#F5234B')}
                style={{ backgroundColor: '#F5234B' }}
              />
              <div
                onClick={() => setColor('#53EF1B')}
                style={{ backgroundColor: '#53EF1B' }}
              />
              <div
                onClick={() => setColor('#0077FF')}
                style={{ backgroundColor: '#0077FF' }}
              />
              <div
                onClick={() => setColor('#B700FF')}
                style={{ backgroundColor: '#B700FF' }}
              />
            </div>
          </div>
          <div className={styles.dateTask}>
            <p className={styles.headerContext}>Дата завершения</p>
            <input
              onChange={(e) => setDate(e.target.value)}
              type='date'
              name=''
              id=''
            />
          </div>
        </div>
        <div className={styles.createButtonContainer}>
          <button onClick={onSubmitForm}>Добавить задачу</button>
        </div>
      </div>
    </div>
  );
};
