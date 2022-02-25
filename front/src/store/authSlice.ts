import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useLazyQuery, gql } from '@apollo/client';

import type { RootState } from './store';
import { useDispatch } from '../hooks';

const SLICE_NAME = 'auth';
const IS_LOGGED_ITEM_KEY = `store-${SLICE_NAME}-isLogged`;

export enum AuthStateEnum {
  LoggedWithInfo,
  LoggedWithoutInfo,
  LoggedAndLoadingInfo,
  Unlogged,
}

interface LoggedWithInfo {
  state: AuthStateEnum.LoggedWithInfo;
  name: string;
  email: string;
  isAdmin: boolean;
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

type AuthState =
  | LoggedWithInfo
  | LoggedWithoutInfo
  | LoggedAndLoadingInfo
  | Unlogged;

const initialState = ((): AuthState => {
  // localStorage will store if client store the HttpOnly cookie `JWT` to get
  // the authentication. If it is is true, we will try to connect to server to
  // get user's information. (So it will be loading soon)
  const isLogged = !!localStorage.getItem(IS_LOGGED_ITEM_KEY);

  return isLogged
    ? {
        state: AuthStateEnum.LoggedWithoutInfo,
      }
    : {
        state: AuthStateEnum.Unlogged,
      };
})();

export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    signOut: (state: AuthState) => {
      localStorage.removeItem(IS_LOGGED_ITEM_KEY);
      state.state = AuthStateEnum.Unlogged;
    },
    signInWithInfo: (
      _state: AuthState,
      actions: PayloadAction<Omit<LoggedWithInfo, 'state'>>,
    ) => {
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
  },
});

const SIGN_IN_QUERY = gql`
  query SignIn($email: String!, $password: String!) {
    # *************************************************************************
    # WARING: Remember to change interface SIGN_IN_QUERY_Return if you change
    # the code below.
    # *************************************************************************

    # Input email, password, and no output.
    user(email: $email, password: $password) {
      name
      email
      isAdmin
    }
  }
`;

interface SIGN_IN_QUERY_Return {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const useSignIn = () => {
  const [signIn, { data, error, loading }] = useLazyQuery(SIGN_IN_QUERY);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signInWithInfo(data as SIGN_IN_QUERY_Return));
  } else if (loading) {
    dispatch(signInAndLoading());
  } else if (error) {
    // do nothing... now
    // TODO: Add error message for user.
  }

  return (email: string, password: string) =>
    signIn({ variables: { email, password } });
};

export const { signOut, signInWithInfo, signInWithoutInfo, signInAndLoading } =
  authSlice.actions;

export const selectState = (state: RootState) => state.auth.state;

export default authSlice.reducer;

