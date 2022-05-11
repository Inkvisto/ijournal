import { StaticDatePicker } from '@mui/lab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { LoginUserDto, ResponseTokens, ResponseUser } from '../../utils/api/types'
import { AppState } from '../store';
import { userDefaultState } from '../initialStates/user';


export interface UserState {
  user:ResponseUser;
}

export const userSlice = createSlice({
  name: 'userLogin',
  initialState:userDefaultState,
  reducers: {
    setUserData: (state,action:PayloadAction<ResponseUser>) => {
    
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
