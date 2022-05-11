import { StaticDatePicker } from '@mui/lab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { categoryDefaultState } from '../initialStates/category';
import { postDefaultState } from '../initialStates/post';
import { AppState } from '../store';




export const categorySlice = createSlice({
  name: 'category',
  initialState:categoryDefaultState,
  reducers: {
    setCategoryData: (state,action) => {
    state[0].category = action.payload} 
  
}

})
  

export const { setCategoryData } = categorySlice.actions;


export const categoryData = (state: AppState) => state.category;



export default categorySlice.reducer
