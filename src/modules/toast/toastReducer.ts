import { ToastActionTypes, SHOW_TOAST, ToastType, HIDE_TOAST } from "./toastActions";

export interface ToastState {
  message: string;
  toastType: ToastType;
}

const initialState: ToastState = {
  message: "",
  toastType: ToastType.SUCCESS
};

export function toastReducer(state = initialState, action: ToastActionTypes): ToastState {
  switch (action.type) {
    case SHOW_TOAST:
      return { message: action.message, toastType: action.toastType };
    case HIDE_TOAST:
      return { ...state, message: action.message };
    default:
      return state;
  }
}
