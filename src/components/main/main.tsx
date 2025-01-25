import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './main.module.css';
import { getTodoList, ITodo, TListTodo } from '../../service/slices/todo.slice';
import { AppDispatch } from 'src/service/store';
import { UserMenu } from '../menu/menu';

export const MainPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const todoSelector = useSelector(getTodoList) || [];

  return (
    <>
      <div className={styles.responseWidth}>
        <div className={styles.menuSetting}>
          <UserMenu />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.body}>
            <h1 className={styles.headerTask}>Task header</h1>
          </div>
        </div>
      </div>
    </>
  );
};
