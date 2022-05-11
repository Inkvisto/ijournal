import { StaticDatePicker } from '@mui/lab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { postDefaultState } from '../initialStates/post';
import { AppState } from '../store';





export const postSlice = createSlice({
  name: 'post',
  initialState:postDefaultState,
  reducers: {
    setPostData: (state,action) => {
    state.posts = action.payload} 
  
}

})
  

export const { setPostData } = postSlice.actions;


export const selectPostData = (state: AppState) => state.post;



export default postSlice.reducer
