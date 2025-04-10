import { useEffect } from 'react';
import { AppDispatch } from '../../../service/store';
import { InputTaskComments } from '../inputTaskComments/inputTaskComments';
import styles from './taskComments.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../../../service/Asyncs/comments';
import { useParams } from 'react-router-dom';
import {
  clearStoreComments,
  getCommentsData,
  getLoadingComments
} from '../../../service/slices/comments.slice';
import { Preloader } from '../preloader/preloader';

export const TaskComments = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingComments = useSelector(getLoadingComments);
  const commentsData = useSelector(getCommentsData);

  const taskId = String(useParams().task);

  useEffect(() => {
    dispatch(clearStoreComments());
    if (typeof taskId === 'string') {
      dispatch(getComment(taskId));
    }
  }, []);

  return (
    <div className={styles.containerComments}>
      {isLoadingComments ? (
        <Preloader />
      ) : (
        <>
          <h1>Комментарии к задаче</h1>
          <div className={styles.containerComponents}>
            <div className={styles.commentsContainer}>
              {commentsData && commentsData.length > 0 ? (
                commentsData.map((comments) => (
                  <div
                    className={styles.commentContainer}
                    key={comments.id_comment}
                  >
                    <p className={styles.nickname}>{comments.user_email}</p>
                    <p className={styles.textComments}>
                      {comments.text_comment}
                    </p>
                  </div>
                ))
              ) : (
                <p>Комментариев пока нет</p>
              )}
            </div>
            <div className={styles.inputCommentPosition}>
              <InputTaskComments />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
