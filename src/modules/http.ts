import { Dispatch } from "react";

import { errorToast } from "./toast/toastActions";

export const handleError = (dispatch: Dispatch<{}>, error: any) => {
  const response = error.response.data;
  if (response.message) {
    dispatch(errorToast(response.message));
  } else {
    console.log(response);
    dispatch(errorToast("Terjadi kesalahan"));
  }
};

export interface Response {
  data: {
    message: string;
  };
  status: number;
}

export const BASE_API = process.env.NODE_ENV === "production" ? "http://beta.natadanus.com" : "http://localhost:3001";
