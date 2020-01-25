export const SHOW_TOAST = "SHOW_TOAST";

export const HIDE_TOAST = "HIDE_TOAST";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error"
}

interface ShowToastAction {
  type: typeof SHOW_TOAST;
  message: string;
  toastType: ToastType;
}

interface HideToastAction {
  type: typeof HIDE_TOAST;
  message: string;
}

export type ToastActionTypes = ShowToastAction | HideToastAction;

export function showToast(message: string): ToastActionTypes {
  return {
    type: SHOW_TOAST,
    message,
    toastType: ToastType.SUCCESS
  };
}

export function errorToast(message: string): ToastActionTypes {
  return {
    type: SHOW_TOAST,
    message,
    toastType: ToastType.ERROR
  };
}

export function hideToastAction(): HideToastAction {
  return {
    type: HIDE_TOAST,
    message: ""
  };
}
