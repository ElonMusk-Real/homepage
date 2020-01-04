import { get, BASE_API } from "../http";
import { selectToken } from "../../session/sessionSelectors";

export interface Profile {
  id: number;
  email: string;
  name: string;
  phoneNumber: string | null;
  lineId: string | null;
  university: string;
  faculty: string;
}

export const getMyProfile = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/users/me`;
  const profile: Profile = await get(url, token);

  return profile;
};
