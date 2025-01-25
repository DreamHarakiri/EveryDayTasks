import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';
import { Routes, Route, useLocation } from 'react-router-dom';
import { RegisterPage } from '../register/register';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { AppDispatch } from '../../service/store';
import { useDispatch } from 'react-redux';
import { checkUserData } from '../../service/Asyncs/login';
import { getCookie } from '../../utils/cookie';
import { ProjectComponent } from '../project/project';
import { TodoListUI } from '../ui/todoListUI/todoListUI';
import { TaskPageUI } from '../ui/taskPageUI/taskPageUI';

export const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserData());
  }, [dispatch]);

  return (
    <>
      <div>
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
