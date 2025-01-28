import { SendFill } from 'react-bootstrap-icons';
import styles from './inputTaskComments.module.css';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from '../../../service/slices/user.slice';

import { nanoid } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../service/store';
import { addComment } from '../../../service/Asyncs/comments';

export const InputTaskComments = () => {
    const [textComment, setTextComment] = useState<string | null>(null);
    const taskId = String(useParams().task);
    const userData = useSelector(getUserEmail);
    const dispatch: AppDispatch = useDispatch();

    const sendCommentData = () => {
        const idComment = nanoid();

        dispatch(
            addComment({
                id_task: taskId,
                id_comment: idComment,
                user_email: userData,
                text_comment: textComment
            })
        );
    };

    let toggleButton = false;

    useEffect(() => {
        if (textComment !== null) {
            textComment?.length < 1 ? (toggleButton = false) : (toggleButton = true);
        }
        console.log(toggleButton);
    }, [textComment]);

    return (
        <div className={styles.containerInput}>
            <input
                className={textComment?.length === 0 ? styles.errorInput : ''}
                type='text'
                onChange={(e) => setTextComment(e.currentTarget.value)}
                placeholder='Введите комментарий'
            />
            <button disabled={!toggleButton} onClick={sendCommentData} type='submit'>
                <SendFill fontSize={24} />
            </button>
        </div>
    );
};
