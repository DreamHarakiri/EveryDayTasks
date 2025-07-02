import { FC, useRef, useState } from 'react';
import styles from './modalEditorTask.module.css';
import { ITask, TListTask } from '../../../service/slices/task.slice';
import { AppDispatch } from 'src/service/store';
import { useDispatch } from 'react-redux';
import { editTaskContent } from '../../../service/Asyncs/task';

export interface IModalEditorTask {
  currentTask: TListTask | undefined;
  onClose: () => void;
}

export const ModalEditorTask: FC<IModalEditorTask> = ({
  currentTask,
  onClose
}) => {
  const headerRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [headerContext, setHeaderContext] = useState<string | undefined>(
    headerRef.current?.value
  );
  const [descriptionContext, setDescriptionContext] = useState<
    string | undefined
  >(descriptionRef.current?.value);
  const [tagsContext, setTagsContext] = useState<string | undefined>(
    tagsRef.current?.value
  );

  const dispatch: AppDispatch = useDispatch();

  const saveConfig = () => {
    if (
      headerRef.current?.value ||
      descriptionRef.current?.value ||
      tagsRef.current?.value
    ) {
      dispatch(
        editTaskContent({
          id: currentTask?.id,
          title: headerRef.current?.value, // Используем текущие данные задачи, если поле пусто
          description: descriptionRef.current?.value,
          tags: tagsRef.current?.value
        })
      );
      onClose();
    } else {
      console.error('Необходимы данные задачи или контекста для сохранения!');
      onClose();
    }
  };

  return (
    <div className={styles.backgroundSlide}>
      <div className={styles.panelEditor}>
        <p>Название задачи:</p>
        <input
          ref={headerRef}
          type='text'
          placeholder='Название задачи'
          defaultValue={currentTask?.title}
        />

        <p>Теги:</p>
        {currentTask?.tags ? (
          <input
            ref={tagsRef}
            type='text'
            placeholder='Теги задачи'
            defaultValue={currentTask?.tags}
          />
        ) : (
          <input ref={tagsRef} type='text' placeholder='Теги задачи' />
        )}

        <p>Описание задачи</p>
        <textarea
          placeholder='Описание задачи'
          ref={descriptionRef}
          defaultValue={currentTask?.description}
        />

        <p>Действия</p>
        <div className={styles.doButtons}>
          <button onClick={saveConfig}>Сохранить</button>
          <button>Удалить задачу</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};
