import { configureStore } from '@reduxjs/toolkit'
import UserInfoSlice from './UserInfoSlice'

export default configureStore({
  reducer: {
    userInfo: UserInfoSlice,
  },
})
