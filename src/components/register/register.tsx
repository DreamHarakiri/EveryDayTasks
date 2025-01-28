import { useState } from 'react';
import styles from './register.module.css';
import { BracesAsterisk } from 'react-bootstrap-icons';
import { AppDispatch } from '../../service/store';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterData } from '../../service/Asyncs/register';
import { getRegisterLoading } from '../../service/slices/user.slice';
import { Preloader } from '../ui/preloader/preloader';

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(getRegisterLoading);

  const handleRegister = () => {
    dispatch(getRegisterData({ name, email, password }));
  };
  return (
    <div className={styles.body}>
      <div className={styles.registerPanel}>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.headerStyle}>
              <h1>
                EveryDay Tasks
                <span>
                  <BracesAsterisk className={styles.logoIcon} size={35} />
                </span>
              </h1>
              <p>Для входа в аккаунт введите данные в поля ниже</p>{' '}
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
            <button
              onClick={handleRegister}
              type='submit'
              className={styles.button}
            >
              Зарегистрироваться
            </button>
          </>
        )}{' '}
      </div>{' '}
    </div>
  );
};
