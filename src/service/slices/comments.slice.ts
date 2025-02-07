import { createSlice } from '@reduxjs/toolkit';
import { addComment, getComment } from '../Asyncs/comments';

export interface IComments {
  id_task: string;
  id_comment: string;
  user_email: string | undefined;
  text_comment: string | null;
}

export type TComments = {
  comments: IComments[];
  isCommentsloading: boolean;
};

export const initialState: TComments = {
  comments: [],
  isCommentsloading: false
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearStoreComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addComment.pending, (state) => {
        state.isCommentsloading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isCommentsloading = false;
        console.log(action.payload);
        if (action.payload !== null) {
          const commentsArray = Array.isArray(action.payload.comments)
            ? action.payload.comments
            : [action.payload.comments];
          commentsArray.forEach((comment) => {
            state.comments.push(comment);
          });
        }
      })

      .addCase(addComment.rejected, (state, action) => {
        //console.log(action.payload);
      })
      .addCase(getComment.pending, (state) => {
        state.isCommentsloading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        if (action.payload.comments && state.comments) {
          if (action.payload.comments.length !== 0) {
            const newComments = action.payload.comments.filter(
              (comment) =>
                !state.comments.some(
                  (existingComment) =>
                    existingComment.id_comment === comment.id_comment
                )
            );

            state.comments.push(...newComments);
          }
          state.isCommentsloading = false;
        }
      });
  }
});

export const { reducer } = commentsSlice;
export const { clearStoreComments } = commentsSlice.actions;
export const getLoadingComments = (state: { commentsList: TComments }) =>
  state.commentsList.isCommentsloading;

export const getCommentsData = (state: { commentsList: TComments }) =>
  state.commentsList.comments;
