import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import teamsReducer from '../features/teams/teamsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    teams: teamsReducer,
  },
});
