import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

/******************************************************************************
 * Constant values.
 *****************************************************************************/
const SLICE_NAME = 'auth';
const IS_LOGGED_ITEM_KEY = `store-${SLICE_NAME}-isLogged`;

/******************************************************************************
 * State types
 *****************************************************************************/
export interface UserData {
  id: number;
  nickname: string;
  email: string;
  isAdmin: boolean;
}

export enum AuthStateEnum {
  LoggedWithInfo,
  LoggedWithoutInfo,
  LoggedAndLoadingInfo,
  Unlogged,
  UnloggedWithError,
}

interface LoggedWithInfo extends UserData {
  state: AuthStateEnum.LoggedWithInfo;
}

interface LoggedWithoutInfo {
  state: AuthStateEnum.LoggedWithoutInfo;
}

interface LoggedAndLoadingInfo {
  state: AuthStateEnum.LoggedAndLoadingInfo;
}

interface Unlogged {
  state: AuthStateEnum.Unlogged;
}

interface UnloggedWithError {
  state: AuthStateEnum.UnloggedWithError;
  message: string;
}

type AuthState =
  | LoggedWithInfo
  | LoggedWithoutInfo
  | LoggedAndLoadingInfo
  | Unlogged
  | UnloggedWithError;

/******************************************************************************
 * Main part
 *****************************************************************************/
const initialState = ((): AuthState => {
  // localStorage will store if client store the HttpOnly cookie `JWT` to get
  // the authentication. If it is is true, we will try to connect to server to
  // get user's information. (So it will be loading soon)
  const isLogged = !!localStorage.getItem(IS_LOGGED_ITEM_KEY);

  return isLogged
    ? { state: AuthStateEnum.LoggedWithoutInfo }
    : { state: AuthStateEnum.Unlogged };
})();

export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    signOut: (state: AuthState) => {
      localStorage.removeItem(IS_LOGGED_ITEM_KEY);
      state.state = AuthStateEnum.Unlogged;
    },
    signInWithInfo: (_state: AuthState, actions: PayloadAction<UserData>) => {
      localStorage.setItem(IS_LOGGED_ITEM_KEY, 'true');
      return {
        state: AuthStateEnum.LoggedWithInfo,
        ...actions.payload,
      } as LoggedWithInfo;
    },
    signInAndLoading: (state: AuthState) => {
      localStorage.removeItem(IS_LOGGED_ITEM_KEY);
      state.state = AuthStateEnum.LoggedAndLoadingInfo;
    },
    signInWithoutInfo: (state: AuthState) => {
      localStorage.removeItem(IS_LOGGED_ITEM_KEY);
      state.state = AuthStateEnum.LoggedWithoutInfo;
    },
    unloggedWithError: (_state: AuthState, actions: PayloadAction<string>) => {
      localStorage.removeItem(IS_LOGGED_ITEM_KEY);
      return {
        state: AuthStateEnum.UnloggedWithError,
        message: actions.payload,
      } as UnloggedWithError;
    },
  },
});

/******************************************************************************
 * Export others
 *****************************************************************************/
export const {
  signOut,
  signInWithInfo,
  signInWithoutInfo,
  signInAndLoading,
  unloggedWithError,
} = authSlice.actions;

/**
 * Get the auth's data.
 */
export const selectAuth = (state: RootState) => state.auth;

/**
 * Get the auth's state data.
 */
export const selectAuthState = (state: RootState) => state.auth.state;

export default authSlice.reducer;
