import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Redux/reducers/counterSlice';
import anotherReducer from '../Redux/reducers/anotherSlice';
import userReducer from '../Redux/reducers/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    another: anotherReducer,
    user: userReducer,
  },
});

export default store;
