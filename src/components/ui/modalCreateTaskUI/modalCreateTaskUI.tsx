import { FC, useEffect, useRef, useState } from 'react';
import { X } from 'react-bootstrap-icons';
import styles from './modalCreateTaskUI.module.css';
import { AppDispatch } from '../../../service/store';
import { useDispatch } from 'react-redux';
import { addTaskData } from '../../../service/Asyncs/task';
import { nanoid } from '@reduxjs/toolkit';
import { ColorPicker, message, notification } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { AlertList } from '../../../components/alert/alertFilter';
import { Alert } from '../../../components/alert';
import { addAlert } from 'src/service/slices/alerts.slice';
import { showAlert } from '../../../utils/alerts';

interface IModalCreateTaskUI {
  idSection: string;
  onClose: () => void;
}

export const ModalCreateTaskUI: FC<IModalCreateTaskUI> = ({
  onClose,
  idSection
}) => {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string>('');
  const [tags, setTags] = useState<string[] | undefined>(undefined);
  const dispatch: AppDispatch = useDispatch();

  const [color, setColor] = useState<string | undefined>('#000000');

  const currentColor = (value: AggregationColor | undefined) => {
    const newColor = value?.toHexString();
    setColor(newColor);
  };

  const closeWin = () => {
    onClose();
  };

  const onSubmitForm = () => {
    if (!title || !description) {
      notification.error({
        message: 'Не заполнены поля',
        description: 'Убедитесь, что заполнили поле заголовка и описание задачи'
      });
    } else {
      dispatch(
        addTaskData({
          id: nanoid(),
          title: title,
          description: description,
          parent: idSection,
          color: color,
          date: date,
          checked: false,
          tags: tags
        })
      );
      onClose();
    }
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
            <div>
              <ColorPicker
                defaultFormat='hex'
                format='hex'
                disabledFormat
                size='middle'
                defaultValue={color}
                onChange={currentColor}
                disabledAlpha
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
            <input
              placeholder='Тег задачи'
              type='tags'
              onChange={(e) => setTags([e.target.value])}
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
