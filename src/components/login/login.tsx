import { BracesAsterisk } from 'react-bootstrap-icons';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getLoginData } from '../../service/Asyncs/login';
import { AppDispatch } from '../../service/store';
import { Preloader } from '../ui/preloader/preloader';
import { getLoginLoading } from '../../service/slices/user.slice';

export const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isLoading = useSelector(getLoginLoading);
  const loginTest = () => {
    dispatch(getLoginData({ email, password }));
  };
  return (
    <div className={styles.body}>
      <div className={styles.containerPanel}>
        <div className={styles.leftPartPanel}>
          <div className={styles.contextContainer}>
            <h1>Нет аккаунта?</h1>
            <p>Тогда точно стоит зарегистрироваться!</p>
            <button>Регистрация</button>
          </div>
        </div>
        <div className={styles.rigtPartPanel}>
          <div className={styles.inputContextContainer}>
            <div className={styles.headerStyle}>
              <h2>Привет!</h2>
              <p>Давай авторизуемся</p>
            </div>
            <input
              type='email'
              placeholder='Введите email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Введите пароль'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginTest}>Продолжить</button>
            <div className={styles.recoverContainer}>
              <a href='#' className={styles.recoverLink}>
                Восстановление пароля
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
