export const SET_SESSION = "SET_SESSION";

export const REMOVE_SESSION = "REMOVE_SESSION";

export enum SessionType {
  SET_SESSION,
  REMOVE_SESSION
}

interface SetSessionAction {
  type: typeof SET_SESSION;
  token: string;
}

interface RemoveSessionAction {
  type: typeof REMOVE_SESSION;
}

export interface SessionState {
  token: string | null;
}

export type SessionActionTypes = SetSessionAction | RemoveSessionAction;

export function setSession(token: string): SetSessionAction {
  return {
    type: SET_SESSION,
    token
  };
}

export function removeSession(): RemoveSessionAction {
  return {
    type: REMOVE_SESSION
  };
}
