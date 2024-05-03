import { createReducer, on } from '@ngrx/store';
import { login, logout } from './store.actions';

export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  username: undefined
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username }) => ({ isLoggedIn: true, username })),
  on(logout, state => initialState)
);
