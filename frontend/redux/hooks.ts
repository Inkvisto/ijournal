
import {AppDispatch,AppState} from './store'

import {useDispatch,TypedUseSelectorHook,useSelector} from 'react-redux'
import { User } from '../utils/api/user/user.types'
import { UserState } from './slices/user'
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
