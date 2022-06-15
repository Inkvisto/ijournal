import { StaticDatePicker } from '@mui/lab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';
import { userDefaultState } from '../initialStates/user';
import { User } from '../../utils/api/user/user.types';


export interface UserState {
  user:User;
}

export const userSlice = createSlice({
  name: 'userLogin',
  initialState:userDefaultState,
  reducers: {
    setUserData: (state,action:PayloadAction<User>) => {
    
      state.user  = action.payload;
    } 
},
extraReducers:{
  [HYDRATE]:(state,action) => {

    return {
      ...state,
      ...action.payload.user
    }
  }
}

})
  

export const { setUserData } = userSlice.actions;


export const selectUserData = (state: AppState) => state.user;



export default userSlice.reducer
