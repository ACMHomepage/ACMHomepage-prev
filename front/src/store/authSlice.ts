import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useLazyQuery, useMutation, gql } from '@apollo/client';

import type { RootState } from './store';
import { useDispatch } from '../hooks';

/******************************************************************************
 * Constant values.
 *****************************************************************************/
const SLICE_NAME = 'auth';
const IS_LOGGED_ITEM_KEY = `store-${SLICE_NAME}-isLogged`;

/******************************************************************************
 * State types
 *****************************************************************************/
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

/******************************************************************************
 * Main part
 *****************************************************************************/
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

/******************************************************************************
 * Sign in part
 *****************************************************************************/

const SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    # *************************************************************************
    # WARING: Remember to change its interface if you change the code below.
    # *************************************************************************

    # Input email, password, and output user's data.
    user(email: $email, password: $password) {
      name
      email
      isAdmin
    }
  }
`;

interface SignInData {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

interface SignInVars {
  email: string;
  password: string;
}

/**
 * Hook useSignIn to sign in.
 *
 * Usage:
 * ```typescript
 * const signIn = useSignIn();
 * // selectAuthState is from the same file.
 * const authState = useSelector(selectAuthState);
 *
 * return (
 *   <button onClick={signIn(email, password)}>
 *     {
 *       // Remember it do not hold all state!
 *       authState === AuthStateEnum.LoggedWithInfo
 *         ? 'Logged'
 *         : 'Unlogged'
 *     }
 *   </button>
 * )
 * ```
 */
export const useSignIn = () => {
  const [signIn, { data, error, loading }] = useLazyQuery<
    SignInData,
    SignInVars
  >(SIGN_IN);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signInWithInfo(data.user));
  } else if (loading) {
    dispatch(signInAndLoading());
  } else if (error) {
    // do nothing... now
    // TODO: Add error message for user. And UnloggedWithError state.
  }

  return (email: string, password: string) =>
    signIn({ variables: { email, password } });
};

/******************************************************************************
 * Sign up part
 *****************************************************************************/

// be mocked in file `front/src/mock/handler/Auth.ts`.
const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    # *************************************************************************
    # WARING: Remember to change its interface if you change the code below.
    # *************************************************************************

    # Input name, email, password, and output its data.
    user(name: $name, email: $email, password: $password) {
      name
      email
      isAdmin
    }
  }
`;

export interface SignUpData {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

export interface SignUpVars {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  // TODO: deal with loading, error, and data.
  const [signUp, { loading, error, data }] = useMutation<
    SignUpData,
    SignUpVars
  >(SIGN_UP);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signInWithInfo(data.user));
  }

  return (name: string, email: string, password: string) =>
    signUp({ variables: { name, email, password } });
};

/******************************************************************************
 * Export others
 *****************************************************************************/
export const { signOut, signInWithInfo, signInWithoutInfo, signInAndLoading } =
  authSlice.actions;

/**
 * Get the auth's data.
 */
export const selectAuth = (state: RootState) => state.auth;

/**
 * Get the auth's state data.
 */
export const selectAuthState = (state: RootState) => state.auth.state;

export default authSlice.reducer;
