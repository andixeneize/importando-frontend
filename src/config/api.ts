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

export interface IQueryParams {
	page?: string
	page_size?: string
	find?: string
	active?: string
	role_id?: string[] | string
	min_created_at?: string
	max_created_at?: string
	sort_by?: string
	order_by?: string
	min_date_last_epoch?: string
	max_date_last_epoch?: string
	gender?: string | string[]
	institution_id?: string | string[]
}

export type IErrorResponse<V> = AxiosError<IQueryErrorResponse, V>
