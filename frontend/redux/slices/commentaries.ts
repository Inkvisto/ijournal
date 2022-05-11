import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { number } from 'yup';
import { ResponseUser } from '../../utils/api/types'
import { postDefaultState } from '../initialStates/post';
import { userDefaultState } from '../initialStates/user';
import { AppState } from '../store';





const commentaryDefaultState:any = {
  commentaries:{
    likes:0,
    author:userDefaultState,
    content:[''],
    posts:postDefaultState
    
  }

  
}



export const commentarySlice = createSlice({
  name: 'commentaries',
  initialState:commentaryDefaultState,
  reducers: {
    setCommentaryData: (state,action) => {
      state.commentaries = action.payload
    } 
    
  }
})
  

export const { setCommentaryData } = commentarySlice.actions;


export const selectCommentaryData = (state: AppState) => state.commentary;



export default commentarySlice.reducer
