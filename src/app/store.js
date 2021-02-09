import { configureStore } from '@reduxjs/toolkit';
import subscriptionReducer from '../features/subscriptionSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
  },
});
