import { createContext, useContext, useEffect, useReducer, useRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { loginCall } from '../scripts/auth/login';
import { ApiUtils } from '../scripts/auth/utils';

interface Pessoa {
  acessadoEm: string;
  cpf: string;
  criadoEm: string;
  dataNascimento: string;
  email: string;
  nome: string;
  _id: string;
}

interface User {
  exp: number;
  iat: number;
  pessoa: Pessoa;
  sub: string;
  username: string;
}

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

interface Action {
  type: string;
  payload?: any;
}

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState: State = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: State, action: Action) => {
    const user = action.payload as User;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state: State, action: Action) => {
    const user = action.payload as User;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state: State) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<State | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = window.sessionStorage.getItem('user');
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);


  const signIn = async (email: string, password: string) => {
    async function extractUserAndPessoa(response: { access_token?: string }): Promise<{ user: User | null, pessoa: Pessoa | null }> {
      if (response.access_token) {
        const token = response.access_token;
        const parts = token.split('.');
        const encodedPayload = parts[1];    
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        return payload;
      } else {
        throw new Error("Invalid email or password"); 
      }
    }
    console.log(email);
    console.log(password);
    debugger;
    const response = await loginCall(email, password);
    const user = await extractUserAndPessoa(response);
    const userStr= JSON.stringify(user);
    const utils = await ApiUtils();
    const utilsStr = JSON.stringify(utils);
    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('user', userStr);
      window.sessionStorage.setItem('token', response.access_token);
      window.sessionStorage.setItem('utils', utilsStr);
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signUp = async (email: string, name: string, password: string) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);