import { BadRequestError, ForbiddenError, NotFoundError, RemoteError, UnauthorizedError } from "./error";

export interface Message {
  message: string;
}

export const BASE_API = process.env.NODE_ENV === "production" ? "https://api.natadanus.com" : "http://localhost:3001";

async function call(url: string, init: RequestInit): Promise<any> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    throw new RemoteError();
  }

  const json = response.json().catch(() => {
    return;
  });

  if (response.status === 400) {
    throw new BadRequestError(await json);
  }
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 403) {
    throw new ForbiddenError(await json);
  }
  if (response.status === 404) {
    throw new NotFoundError(await json);
  }
  if (response.status < 200 || response.status >= 300) {
    throw new RemoteError(await json);
  }

  return json;
}

async function request(method: string, url: string, token?: string, headers?: any, body?: any): Promise<any> {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const init: RequestInit = {
    method,
    mode: "cors",
    headers: {
      ...headers,
      ...authHeader,
      pragma: "no-cache",
      "cache-control": "no-cache"
    },
    body
  };

  return call(url, init);
}

export async function get(url: string, token?: string): Promise<any> {
  return request("GET", url, token);
}

export async function delete_(url: string, token?: string): Promise<any> {
  return request("DELETE", url, token);
}

export async function post(url: string, token?: string, body?: any): Promise<any> {
  return request("POST", url, token, { "Content-Type": "application/json" }, JSON.stringify(body));
}

export async function put(url: string, token?: string, body?: any): Promise<any> {
  return request("PUT", url, token, { "Content-Type": "application/json" }, JSON.stringify(body));
}

export async function patch(url: string, token?: string, body?: any): Promise<any> {
  return request("PATCH", url, token, { "Content-Type": "application/json" }, JSON.stringify(body));
}

export async function postMultipart(url: string, token: string, parts: { [key: string]: any }): Promise<any> {
  const body = new FormData();
  Object.keys(parts).forEach((part) => body.append(part, parts[part]));

  return request("POST", url, token, {}, body);
}

export async function putMultipart(url: string, token: string, parts: { [key: string]: any }): Promise<any> {
  const body = new FormData();
  Object.keys(parts).forEach((part) => body.append(part, parts[part]));

  return request("PUT", url, token, {}, body);
}
