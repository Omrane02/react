import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '../../types/post'

interface PostsState {
  posts: Post[]
}

const initialState: PostsState = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    addPostLocal: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    removePostLocal: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
  },
})

export const { setPosts, addPostLocal, removePostLocal } = postsSlice.actions

export default postsSlice.reducer
