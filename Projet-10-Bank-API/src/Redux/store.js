import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Redux/reducers/counterSlice';
import anotherReducer from '../Redux/reducers/anotherSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    another: anotherReducer,
  },
});

export default store;
