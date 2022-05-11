
import {AppDispatch,AppState} from './store'

import {useDispatch,TypedUseSelectorHook,useSelector} from 'react-redux'
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector