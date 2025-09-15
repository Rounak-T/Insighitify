import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice' 
import SubsReducer from './DataSlice'
import UserReducer from './UserSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    subs: SubsReducer,
    user: UserReducer
  },
})