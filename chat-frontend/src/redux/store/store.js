import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counter'
import userReducer from '../slice/user'
import chat from '../slice/chat'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      user: userReducer,
      chat,
  },
})

export default store