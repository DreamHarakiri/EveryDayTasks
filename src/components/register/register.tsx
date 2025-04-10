import { useState } from 'react';
import styles from './register.module.css';
import { BracesAsterisk } from 'react-bootstrap-icons';
import { AppDispatch } from '../../service/store';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterData } from '../../service/Asyncs/register';
import { getRegisterLoading } from '../../service/slices/user.slice';
import { Preloader } from '../ui/preloader/preloader';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(getRegisterLoading);

  const handleRegister = () => {
    password === confirmPass
      ? dispatch(getRegisterData({ name, email, password }))
      : console.log('No');
  };
  return (
    <div className={styles.body}>
      <div className={styles.containerPanel}>
        <div className={styles.leftPartPanel}>
          <div className={styles.contextContainer}>
            <h1>Есть аккаунт?</h1>
            <p>Давай авторизуемся!</p>
            <button>Авторизация</button>
          </div>
        </div>
        <div className={styles.rigtPartPanel}>
          <div className={styles.inputContextContainer}>
            <div className={styles.headerStyle}>
              <h2>Впервые тут?</h2>
              <p>Давай знакомиться</p>
            </div>
            <input
              type='text'
              placeholder='Введите имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type='email'
              placeholder='Введите email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type='password'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type='password'
              placeholder='Повторите пароль'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={handleRegister}
              type='submit'
              className={styles.button}
            >
              Зарегистрироваться
            </button>
            <div className={styles.recoverContainer}>
              <Link className={styles.registerLink} to={{ pathname: '/login' }}>
                Авторизация
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
