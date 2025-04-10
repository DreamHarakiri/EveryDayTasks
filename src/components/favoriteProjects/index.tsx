import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { getProjects } from '../../service/slices/project.slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../service/store';
import { removeTodo } from '../../service/slices/todo.slice';
import { getTodoData } from '../../service/Asyncs/todo';

import { useMemo } from 'react';

export const FavoriteList = () => {
  const projectList = useSelector(getProjects);
  const navgiate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const uniqueProjects = useMemo(
    () =>
      projectList.filter(
        (project, index, self) =>
          index ===
          self.findIndex((p) => JSON.stringify(p) === JSON.stringify(project))
      ),
    [projectList]
  );

  const getProject = (id: string) => {
    dispatch(removeTodo());
    navgiate('/projects/' + id);
    dispatch(getTodoData(id));
  };

  return (
    <>
      <ul className={styles.listContainer}>
        {uniqueProjects.map((project) => (
          <li key={project.id} onClick={() => getProject(project.id)}>
            # {project.name}
          </li>
        ))}
      </ul>
    </>
  );
};
