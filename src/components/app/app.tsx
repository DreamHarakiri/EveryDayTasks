import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';
import { Routes, Route, useLocation } from 'react-router-dom';
import { RegisterPage } from '../register/register';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect, useLayoutEffect } from 'react';
import { AppDispatch } from '../../service/store';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserData } from '../../service/Asyncs/login';
import { getCookie } from '../../utils/cookie';
import { ProjectComponent } from '../project/project';
import { TodoListUI } from '../ui/todoListUI/todoListUI';
import { TaskPageUI } from '../ui/taskPageUI/taskPageUI';
import { getProjectData } from '../../service/Asyncs/project';
import { getUserEmail } from '../../service/slices/user.slice';
import { AlertList } from '../alert/alertFilter';

export const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch: AppDispatch = useDispatch();
  const emailUser = useSelector(getUserEmail);

  useEffect(() => {
    dispatch(checkUserData());
  }, [dispatch]);

  useLayoutEffect(() => {
    emailUser && dispatch(getProjectData(emailUser));
    console.log(emailUser);
  }, [emailUser]);

  return (
    <>
      <div>
        <AlertList />

        <Routes location={backgroundLocation || location}>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route path='/profile' />
          <Route
            path='/projects'
            element={
              <ProtectedRoute>
                <ProjectComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id'
            element={
              <ProtectedRoute>
                <TodoListUI />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/:task'
            element={
              <ProtectedRoute>
                <TaskPageUI />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};
