import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getLoadingTask,
  getTaskList
} from '../../../service/slices/task.slice';
import { AppDispatch } from '../../../service/store';
import styles from './taskPageUI.module.css';
import { useEffect, useState } from 'react';
import { getProjects } from '../../../service/slices/project.slice';
import { UserMenu } from '../../../components/menu/menu';
import { TaskComments } from '../taskComments/taskComments';
import { Preloader } from '../preloader/preloader';
import { getUserEmail } from '../../../service/slices/user.slice';
import { checkTaskUser } from '../../../service/Asyncs/task';
import { clearStoreTask } from '../../../service/slices/task.slice';
import { getProjectDataCurrent } from '../../../service/Asyncs/project';
import { Sliders } from 'react-bootstrap-icons';
import { ModalEditorTask } from '../modalEditorTask/modalEditorTask';

export const TaskPageUI = () => {
  const dispatch: AppDispatch = useDispatch();
  const taskId = String(useParams().task);
  const projectId = String(useParams().id);
  const allTasks = useSelector(getTaskList);
  let currentTask = allTasks.find((allTasks) => allTasks.id === taskId);
  const linkProject = '/projects/' + projectId;
  const getProject = useSelector(getProjects);
  const getLoading = useSelector(getLoadingTask);
  const userData = useSelector(getUserEmail);

  const currentProject = getProject.find(
    (getProject) => getProject.id === projectId
  );

  const [visible, setVisible] = useState<boolean>(false);



  useEffect(() => {
    dispatch(clearStoreTask());
    if (userData !== undefined) {
      dispatch(
        checkTaskUser({ user: userData, project: projectId, task: taskId })
      );
      dispatch(getProjectDataCurrent(projectId));
    }
  }, []);

  return (
    <div className={styles.body}>
      {visible ? (
        <ModalEditorTask
          onClose={() => setVisible(!visible)}
          currentTask={currentTask}
        />
      ) : null}

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
            <div className={styles.headersContent}>
              <h1>{currentTask?.title}</h1>
              <div className={styles.containerEditor}>
                <Sliders
                  onClick={() => setVisible(!visible)}
                  style={{ cursor: 'pointer' }}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            {currentTask?.tags ? (
              <p className={styles.tagsStyles}>{currentTask?.tags}</p>
            ) : null}
            <p className={styles.description}>Описание задачи</p>
            <pre>
              <p className={styles.contentTask}>{currentTask?.description}</p>
            </pre>
            {currentTask?.date ? (
              <div className={styles.dateStyles}>
                <div className={styles.lineHeightData} />
                <div>
                  <p>Дата завершения задачи:</p>
                  <p>{currentTask?.date}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
        <div className={styles.commentsDiv}>
          <TaskComments />
        </div>
      </div>
    </div>
  );
};
