import { useState } from 'react';
import styles from './register.module.css';
import { BracesAsterisk } from 'react-bootstrap-icons';
import { AppDispatch } from '../../service/store';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisterData } from '../../service/Asyncs/register';
import { getRegisterLoading } from '../../service/slices/user.slice';
import { Preloader } from '../ui/preloader/preloader';

const logo = require('../register/images/user.jpg');

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
    <>
      <div className={styles.page}>
        <div className={styles.registerPanell}>
          <div className={styles.authorization_wrapper}>
            <section className={styles.authorization}>
              <h2 className={styles.headingAuthorization}>Есть аккаунт?</h2>
              <p>Достаточно просто авторизоваться!</p>
              <button type='submit'>Авторизация</button>
            </section>
          </div>
          <section className={styles.formRegister}>
            <h2>Ты тут впервые?</h2>
            <p>Давай знакомиться! Заполни поля ниже</p>
            <form action=''>
              <fieldset className={styles.formRegister__borderNone}>
                {/* <label className={styles.Username} htmlFor='text'>
                  Username
                </label> */}
                <img
                  className={styles.userNameIcon}
                  alt='logo'
                  src={String(logo)}
                />
                <input
                  className={styles.Username_input}
                  type='text'
                  placeholder='Username'
                  id='text'
                />
                <input type='email' placeholder='Email Address' />
                <input type='password' placeholder='Password' />
              </fieldset>
            </form>
            <button type='submit' className={styles.formRegister__button}>
              Продолжить
            </button>
          </section>
        </div>
      </div>
    </>
  );
};
