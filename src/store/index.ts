import authenticationReducer from "../features/authenticationSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
