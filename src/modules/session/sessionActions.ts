export const SET_SESSION = "SET_SESSION";

export const REMOVE_SESSION = "REMOVE_SESSION";

export enum SessionType {
  SET_SESSION,
  REMOVE_SESSION
}

interface SetSessionAction {
  type: typeof SET_SESSION;
  token: string;
  isAdmin: boolean;
}

interface RemoveSessionAction {
  type: typeof REMOVE_SESSION;
}

export interface SessionState {
  token: string | null;
  isAdmin: boolean;
}

export type SessionActionTypes = SetSessionAction | RemoveSessionAction;

export function setSession(token: string, isAdmin: boolean): SetSessionAction {
  return {
    type: SET_SESSION,
    isAdmin,
    token
  };
}

export function removeSession(): RemoveSessionAction {
  return {
    type: REMOVE_SESSION
  };
}
