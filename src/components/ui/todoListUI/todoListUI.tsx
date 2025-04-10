import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserEmail } from '../../../service/slices/user.slice';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch } from '../../../service/store';
import { getMember, getProjectData } from '../../../service/Asyncs/project';
import {
  clearProjects,
  getLoadingProject,
  getProjects
} from '../../../service/slices/project.slice';
import { TodoButtonUI } from '../todoButtonUI/todoButtonUI';
import { getTodoData } from '../../../service/Asyncs/todo';
import { getTodoList, removeTodo } from '../../../service/slices/todo.slice';

import styles from './todoListUI.module.css';
import { Gear } from 'react-bootstrap-icons';
import { InputTaskUI } from '../inputUI/inputTask';
import { checkedTaskData, getTaskData } from '../../../service/Asyncs/task';
import {
  changeChecked,
  getTaskList,
  TListTask
} from '../../../service/slices/task.slice';
import { UserMenu } from '../../../components/menu/menu';
import { InputTaskComments } from '../inputTaskComments/inputTaskComments';
import { Preloader } from '../preloader/preloader';

export const TodoListUI = () => {
  const project = String(useParams().id);
  const email = useSelector(getUserEmail);
  const dispatch: AppDispatch = useDispatch();
  const allProjects = useSelector(getProjects);
  let currentProject = allProjects.find(
    (allProjects) => allProjects.id === project
  );

  const getLoadingProjects = useSelector(getLoadingProject);
  const [ModalCreateTask, setModalCreateTask] = useState<Boolean>(false);

  const changeStatusTaskCreate = () => {
    setModalCreateTask(!ModalCreateTask);
  };

  const getTodo = useSelector(getTodoList);
  const getTask = useSelector(getTaskList);

  useEffect(() => {
    dispatch(clearProjects());
    dispatch(removeTodo());
    if (email !== undefined) {
      dispatch(getProjectData(email));

      dispatch(getMember({ email, project }));
    }
    if (project) {
      dispatch(getTodoData(project));
    }
  }, []);

  useEffect(() => {
    getTodo.map((item) => {
      dispatch(getTaskData(item.id));
    });
  }, [getTodo]);

  const checkedBox = useRef<HTMLInputElement | null>(null);

  const checkPoint = (id: string) => {
    console.log(id);

    let currentPoint = checkedBox.current;
    let invesria = !currentPoint?.defaultChecked;

    dispatch(checkedTaskData({ id: id, checked: invesria }));
    dispatch(changeChecked({ id }));
  };

  const transformBoolean = (count: boolean | number) => {
    let status: boolean;
    count === 0 ? (status = false) : (status = true);
    return status;
  };

  return (
    <div className={styles.body}>
      <UserMenu />
      {getLoadingProjects ? (
        <Preloader />
      ) : (
        <div className={styles.contentContainer}>
          <p className={styles.navigateLink}>
            <Link to='/projects'>проекты</Link>
          </p>
          <div className={styles.headerContentPage}>
            <h1 className={styles.headerProject}>{currentProject?.name}</h1>
            <button>
              <Gear size={32} />
            </button>
          </div>
          <div className={styles.todoTitleContainer}>
            {getTodo.map((item) => (
              <div className={styles.todoTitle} key={item.id}>
                <div className={styles.headerColumn}>
                  <h2>{item.title}</h2>
                  <button>
                    <Gear width={24} height={24} />
                  </button>
                </div>
                <div className={styles.colorLineTitile} />
                <div>
                  {getTask
                    .filter((newTask: TListTask) => newTask.parent === item.id)
                    .map((newTask: TListTask) => (
                      <div
                        key={newTask.id}
                        className={styles.taskContainer}
                        style={{
                          borderBottom: '2px solid ' + newTask.color
                        }}
                      >
                        <div className={styles.itemsPosition}>
                          <input
                            type='checkbox'
                            className={styles.taskCheckbox}
                            name=''
                            id={newTask.id}
                            ref={checkedBox}
                            defaultChecked={newTask.checked}
                            onChange={() => {
                              checkPoint(newTask.id);
                            }}
                          />
                          <label htmlFor={newTask.id} />
                          <Link to={newTask.id} className={styles.flexTask}>
                            <div className={styles.contextTaskContainer}>
                              <h3>{newTask.title}</h3>
                              {newTask.description !== '' && (
                                <p>{newTask.description}</p>
                              )}
                              {newTask.date && <p>Дата: {newTask?.date}</p>}
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                <InputTaskUI Section={item.id} />
              </div>
            ))}
            <div className={styles.buttonAddTodo}>
              <TodoButtonUI idProject={project} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
