import axios, { type AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface IQueryErrorResponse {
  title: string;
  status: number;
}

export interface ISuccessResponse {
  status: number;
  message: string;
}

export type IErrorResponse<V> = AxiosError<IQueryErrorResponse, V>;
