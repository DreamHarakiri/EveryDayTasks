import { FC, useEffect } from 'react';
import styles from './styles.module.css';
import { AppDispatch } from '../../service/store';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../../service/slices/alerts.slice';

//icons
import successIcon from './icons/success.png';
import errorIcon from './icons/error.png';
import neutrallIcon from './icons/info.png';
//

interface IAlert {
  id: number;
  type: 'success' | 'warning' | 'neutrall';
  header: string;
  text: string;
  time: number;
}

export const Alert: FC<IAlert> = ({ id, time, header, text, type }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const timerAlert = setTimeout(() => {
      dispatch(hideAlert(id));
    }, time);

    return () => clearTimeout(timerAlert);
  }, [dispatch, id]);

  const colorType = {
    success: successIcon,
    warning: errorIcon,
    neutrall: neutrallIcon
  };

  return (
    <>
      <div className={styles.boxAlert}>
        <img src={colorType[type]} alt='' />
        <div>
          <h1 className={styles.headerAlert}>{header}</h1>
          <p className={styles.textAlert}>{text}</p>
        </div>
      </div>
    </>
  );
};
