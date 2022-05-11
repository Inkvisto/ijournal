import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer  from './slices/user'
import postReducer from './slices/post'
import commentaryReducer  from './slices/commentaries'
import categoryReducer from './slices/category'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () => 
  configureStore({
    reducer: {
        user:userReducer,
        post:postReducer,
        commentary:commentaryReducer,
        category:categoryReducer
    },
    devTools: true,
})


export const store = makeStore()


export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type AppState =ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore,{debug:true});

