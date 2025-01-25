import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getLoadingTask,
  getTaskList
} from '../../../service/slices/task.slice';
import { AppDispatch } from '../../../service/store';
import styles from './taskPageUI.module.css';
import { useEffect } from 'react';
import { getProjects } from '../../../service/slices/project.slice';
import { UserMenu } from '../../../components/menu/menu';
import { TaskComments } from '../taskComments/taskComments';
import { Preloader } from '../preloader/preloader';

export const TaskPageUI = () => {
  const dispatch: AppDispatch = useDispatch();
  const taskId = String(useParams().task);
  const projectId = String(useParams().id);
  const allTasks = useSelector(getTaskList);
  let currentTask = allTasks.find((allTasks) => allTasks.id === taskId);
  const linkProject = '/projects/' + projectId;
  const getProject = useSelector(getProjects);
  const getLoading = useSelector(getLoadingTask);

  const currentProject = getProject.find(
    (getProject) => getProject.id === projectId
  );

  //Докинуть запрос на случай если пользователь перейдет по ссылке

  return (
    <div className={styles.body}>
      <UserMenu />
      <div className={styles.containerContent}>
        {getLoading ? (
          <Preloader />
        ) : (
          <div className={styles.containerCurrentContent}>
            <p className={styles.navigateLink}>
              <Link to='/projects'>проекты</Link> /
              <Link to={linkProject}> {currentProject?.name}</Link>
            </p>
            <h1>{currentTask?.title}</h1>
            <p className={styles.description}>Описание задачи</p>
            <pre>
              <p className={styles.contentTask}>{currentTask?.description}</p>
            </pre>
            {currentTask?.date ?? (
              <div>
                <p>Дата завершения задачи:</p>
                <p>{currentTask?.date}</p>
              </div>
            )}
          </div>
        )}
        <div className={styles.commentsDiv}>
          <TaskComments />
        </div>
      </div>
    </div>
  );
};
