import { useEffect } from 'react';
import { UserMenu } from '../menu/menu';
import { ButtonAddUI } from '../ui/projectUI/projectUI';
import styles from './projcetPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from '../../service/slices/user.slice';
import { AppDispatch } from '../../service/store';
import { getProjectData } from '../../service/Asyncs/project';
import {
  clearProjects,
  getLoadingProject,
  getProjects
} from '../../service/slices/project.slice';
import { ProjectCardUI } from '../ui/projectCardUI/projectCardUI';
import { Preloader } from '../ui/preloader/preloader';

export const ProjectComponent = () => {
  const userData = useSelector(getUserEmail);
  const dispatch: AppDispatch = useDispatch();
  const projectList = useSelector(getProjects);
  const isLoadingProjects = useSelector(getLoadingProject);
  useEffect(() => {
    if (userData) {
      dispatch(clearProjects());
      dispatch(getProjectData(userData));
    }
  }, []);

  return (
    <>
      <div className={styles.body}>
        <UserMenu />
        <div className={styles.contentContainer}>
          {isLoadingProjects ? (
            <Preloader />
          ) : (
            <>
              <div className={styles.header}>
                <h1>Ваши проекты:</h1>
                <ButtonAddUI />
              </div>
              <div className={styles.containerCards}>
                <div className={styles.cards}>
                  {projectList.map((item) => (
                    <ProjectCardUI
                      key={item.id}
                      id={item.id}
                      owner={item?.owner}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
