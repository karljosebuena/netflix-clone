import { createSlice } from '@reduxjs/toolkit';

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    subscription: null,
  },
  reducers: {
    subscribe: (state, action) => {
      state.subscription = action.payload
    },
    unsubscribe: (state) => {
      state.subscription = null
    }
  },
});

// actions
export const { subscribe, unsubscribe } = subscriptionSlice.actions;

// selectors
export const selectSubscription = state => state.subscription.subscription;

export default subscriptionSlice.reducer;
