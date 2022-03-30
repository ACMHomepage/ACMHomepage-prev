import { useMutation, gql } from '@apollo/client';

import { useDispatch } from '../hooks';
import {
  signInWithInfo,
  signInAndLoading,
  unloggedWithError,
  signOut,
} from '../store/authSlice';
import type { UserData } from '../store/authSlice';

/******************************************************************************
 * Sign in part
 *****************************************************************************/

export const SIGN_IN_MUTATION_NAME = 'SignIn';

export const SIGN_IN_MUTATION = gql`
  mutation ${SIGN_IN_MUTATION_NAME}($email: String!, $password: String!) {
    # *************************************************************************
    # WARING: Remember to change its interface if you change the code below.
    # *************************************************************************

    # Input email, password, and output user's data.
    signIn(email: $email, password: $password) {
      nickname # string
      email # string
      isAdmin # boolean
    }
  }
`;

export interface SignInData {
  signIn: UserData;
}

export interface SignInVars {
  email: string;
  password: string;
}

/**
 * Hook useSignIn to sign in. It will talk to GraphQL server and update the
 * redux store auto. That means you should use another hook `useSelector` from
 * redux to get the state.
 *
 * @example
 * ```typescript
 * const signIn = useSignIn();
 * // the function `selectAuthState` is from the file named
 * // `front/src/store/authSlice.ts`.
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
  const [signIn, { data, error, loading }] = useMutation<
    SignInData,
    SignInVars
  >(SIGN_IN_MUTATION);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signInWithInfo(data.signIn));
  } else if (loading) {
    dispatch(signInAndLoading());
  } else if (error) {
    dispatch(unloggedWithError(error.message));
  }

  return (email: string, password: string) =>
    signIn({ variables: { email, password } });
};

/******************************************************************************
 * Register part
 *****************************************************************************/

export const REGISTER_MUTATION_NAME = 'Register';

export const REGISTER_MUTATION = gql`
  mutation ${REGISTER_MUTATION_NAME}
      ($nickname: String!, $email: String!, $password: String!) {
    # *************************************************************************
    # WARING: Remember to change its interface if you change the code below.
    # *************************************************************************

    # Input nickname, email, password, and output its data.
    register(nickname: $nickname, email: $email, password: $password) {
      nickname # string
      email # string
      isAdmin # string
    }
  }
`;

export interface RegisterData {
  register: UserData;
}

export interface RegisterVars {
  nickname: string;
  email: string;
  password: string;
}

/**
 * Hook useRegister to register. It will talk to GraphQL server and update the
 * redux store auto. That means you should use another hook `useSelector` from
 * redux to get the state. It will sign in auto.
 *
 * @todo
 * Now back-end cannot sign in auto. Please let back-end set httponly cookie!
 *
 * @example
 * ```typescript
 * const register = useRegister();
 * // the function `selectAuthState` is from the file named
 * // `front/src/store/authSlice.ts`.
 * const authState = useSelector(selectAuthState);
 *
 * return (
 *   <button onClick={register(email, password)}>
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

export const useRegister = () => {
  const [register, { loading, error, data }] = useMutation<
    RegisterData,
    RegisterVars
  >(REGISTER_MUTATION);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signInWithInfo(data.register));
  } else if (loading) {
    dispatch(signInAndLoading());
  } else if (error) {
    dispatch(unloggedWithError(error.message));
  }

  return (nickname: string, email: string, password: string) =>
    register({ variables: { nickname, email, password } });
};

/******************************************************************************
 * Sign out part
 *****************************************************************************/

export const SIGN_OUT_MUTATION_NAME = 'SignOut';

export const SIGN_OUT_MUTATION = gql`
  mutation ${SIGN_OUT_MUTATION_NAME} {
    # *************************************************************************
    # WARING: Remember to change its interface if you change the code below.
    # *************************************************************************
    signOut
  }
`;

export interface SignOutData {
  signOut: boolean; // The type is not matter.
}

/**
 * Hook useSignOut to sign out. It will talk to GraphQL server and update the
 * redux store auto. That means you should use another hook `useSelector` from
 * redux to get the state. It will sign in auto.
 *
 * @todo
 * If the application is start, please sign out auto if the state is `Unlogged`
 * or something else.
 *
 * @example
 * ```typescript
 * const signOut = useSignOut();
 * // the function `selectAuthState` is from the file named
 * // `front/src/store/authSlice.ts`.
 * const authState = useSelector(selectAuthState);
 *
 * return (
 *   <button onClick={signOut()}>
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

export const useSignOut = () => {
  const [signOutFunction, { data }] =
    useMutation<SignOutData>(SIGN_OUT_MUTATION);
  const dispatch = useDispatch();

  if (data) {
    dispatch(signOut());
  }

  return signOutFunction;
};
