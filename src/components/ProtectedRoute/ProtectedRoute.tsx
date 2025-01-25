import { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getAuthUser,
  getUserData,
  authChecked
} from '../../service/slices/user.slice';
import { Preloader } from '../ui/preloader/preloader';
import { getCookie } from '../../utils/cookie';

type TProtectedRoute = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  onlyUnAuth
}) => {
  const isAuth = useSelector(getAuthUser);
  const user = useSelector(getUserData);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем состояние аутентификации при загрузке компонента
    if (!isAuth) {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        dispatch(authChecked());
      }
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};
