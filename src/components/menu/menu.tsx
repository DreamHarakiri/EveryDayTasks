import {
  Bell,
  Binoculars,
  Bookmark,
  House,
  Search
} from 'react-bootstrap-icons';
import styles from './menu.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../service/slices/user.slice';
import { FavoriteList } from '../favoriteProjects';
import { AppDispatch } from '../../service/store';
import { addAlert } from '../../service/slices/alerts.slice';
import { time } from 'console';

export const UserMenu = () => {
  const apadptiveIcons = {
    weight: 20,
    height: 20
  };
  const userData = useSelector(getUserData);
  const dispatch: AppDispatch = useDispatch();
  const testAlertFunc = () => {
    console.log('test');

    dispatch(
      addAlert({
        id: Date.now(),
        header: 'Авторизация',
        text: 'Вы успешно авторизовались в системе, //узнаем на проектах мы или нет, завтра сделать автоматическую проверку',
        type: 'success',
        time: 5000,
        isVisible: true
      })
    );
  };
  const getPage = location.pathname.includes('/projects'); //узнаем на проектах мы или нет, завтра сделать автоматическую проверку
  return (
    <div className={styles.containerMenu}>
      <ul className={styles.ul}>
        <Link to={{ pathname: '/profile' }}>
          <li className={styles.profileLink}>
            <div className={styles.avatarCircle} />
            <p>{userData?.name}</p>
          </li>
        </Link>
        <li className={styles.searchList}>
          <input
            placeholder='Поиск проектов'
            className={styles.searchMenu}
            type='search'
            onChange={() => testAlertFunc()}
          />
          <Binoculars className={styles.iconSearch} />
        </li>
        <Link className={styles.link} to={{ pathname: '/' }}>
          <li>
            <House
              style={{ stroke: 'currentColor', strokeWidth: '0.3' }}
              width={apadptiveIcons.weight}
              height={apadptiveIcons.weight}
              className={styles.iconsMenu}
            />
            <p>Главная</p>
          </li>
        </Link>
        <Link className={styles.link} to={{ pathname: '/projects' }}>
          <li>
            <Search
              width={apadptiveIcons.weight}
              height={apadptiveIcons.weight}
              style={{ stroke: 'currentColor', strokeWidth: '0.3' }}
              className={styles.iconsMenu}
            />
            <p>Проекты</p>
          </li>
        </Link>
        <Link className={styles.link} to={{ pathname: '/projects' }}>
          <li>
            <Bookmark
              style={{ stroke: 'currentColor', strokeWidth: '0.3' }}
              className={styles.iconsMenu}
              width={apadptiveIcons.weight}
              height={apadptiveIcons.weight}
            />
            <p>Избранное</p>
          </li>
        </Link>
        <Link className={styles.link} to={{ pathname: '/projects' }}>
          <li>
            <Bell
              style={{ stroke: 'currentColor', strokeWidth: '0.3' }}
              width={apadptiveIcons.weight}
              height={apadptiveIcons.weight}
              className={styles.iconsMenu}
            />
            <p>Уведомления</p>
          </li>
        </Link>
      </ul>
      <div className={styles.lineMenu} />
      <p className={styles.headerProjects}>Проекты</p>
      <div>
        <FavoriteList />
      </div>
    </div>
  );
};
