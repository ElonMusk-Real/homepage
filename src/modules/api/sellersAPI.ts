import { BASE_API, get } from "./http";
import { selectToken } from "../session/sessionSelectors";

export interface InsertSellerForm {
  name: string;
  phoneNumber: string;
  address: string;
}

export interface Seller {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
}

export const fetchSellers = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/`;
  const sellers: Seller[] = await get(url, token);

  return sellers;
};
