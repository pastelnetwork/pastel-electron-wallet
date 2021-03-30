import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { pastelIDReducer } from "../features/pastelID";

const store = configureStore({
  reducer: {
    pastelIDReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
