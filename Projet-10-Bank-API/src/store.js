import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import anotherReducer from './reducers/anotherSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    another: anotherReducer,
  },
});

export default store;
