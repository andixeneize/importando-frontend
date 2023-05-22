import axios, { type AxiosError } from 'axios'

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

interface IQueryErrorResponse {
	status: number
	message: string
	extra?: Array<{
		value: string
		msg: string
		param: string
		location: string
	}>
}

export interface ISuccessResponse {
	status: number
	message: string
}


export type IErrorResponse<V> = AxiosError<IQueryErrorResponse, V>
