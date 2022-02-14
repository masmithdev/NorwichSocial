import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { IAuth } from "./IAuth";

export interface IApiResponse {
  statusCode: number,
  statusDescription: string,
  payload?: IAuth
}

export const requestApi = async (verb: string, endpoint: string, payload?: object): Promise<IApiResponse> => {
  const url = "xxx" + endpoint;
  let action: Promise<AxiosResponse<IAuth>> | undefined;

  switch (verb.toLowerCase()) {
    case "get": {
      action = axios.get(url);
      break;
    }
    case "post": {
      action = axios.post(url, payload);
      break;
    }
    case "put": {
      action = axios.put(url, payload);
      break;
    }
    case "patch": {
      action = axios.patch(url, payload);
      break;
    }
    case "delete": {
      action = axios.delete(url);
      break;
    }
  } // -switch

  if (action) {
    try {
      const response = await action;
      return {
        statusCode: response.status,
        statusDescription: response.statusText,
        payload: response.data,
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError) {
          return {
            statusCode: err.response?.status ?? -1,
            statusDescription: err.response?.statusText ?? '',
            payload: err.response?.data,
          }
        }
      }

      return {
        statusCode: -1,
        statusDescription: 'Unknown error',
      }
    } // -try/catch
  } //- if

  return {
    statusCode: -1,
    statusDescription: 'Unknown verb',
  }
}
