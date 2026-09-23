import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Comment } from '../../types/comment'

interface CommentsState {
  comments: Comment[]
}

const initialState: CommentsState = {
  comments: [],
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
    addCommentLocal: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload)
    },
    removeCommentLocal: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload)
    },
  },
})

export const { setComments, addCommentLocal, removeCommentLocal } = commentsSlice.actions

export default commentsSlice.reducer
