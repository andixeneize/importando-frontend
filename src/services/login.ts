import { useMutation } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'
import type { IFormLogin } from '@schemas/login'

const URLS = {
	LOGIN: '/Usuario/Login',
	FORGOTPWD: '/Usuario/resetPassword',
}

// Forgot password

interface IResForgotPwd extends ISuccessResponse{
	data?: {
		is_sended: string
	}
}

export interface IForgotPwd {
	email: string
	lang: string
}

export const postForgotPwd = async (body: IForgotPwd) => {
	const { data } = await api.post<IResForgotPwd>(
		URLS.FORGOTPWD,
		body
	)
	return data
}

export const usePostForgotPwd = () => {
	return useMutation<IResForgotPwd, IErrorResponse<IForgotPwd>, IForgotPwd>(
		['POST_FORGOT_PWD'],
		postForgotPwd,
		{
			onError: error => {
				alert('Error: ' + error.response?.data.message)
			},
		}
	)
}

// Login

export interface ILoginResponse extends ISuccessResponse {
	data?: {
		token: string
	}
}

export interface ISession {
	expires: string
	user: {
		accessToken: string
		idUsuario: number
		name: string
		apellido: string
		telefono: number
		mail: string
		fechaNacimiento: string
		codigo: string
		activo: boolean
		plan: number
	}
}

export const login = async (body: IFormLogin) => {
	// const { data } = await api.get<IToken>(URLS.TOKEN, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// })
	const res = await api.post<ILoginResponse>(URLS.LOGIN, body, {
		// headers: {
		// 	'Content-Type': 'application/json',
		// 	'access-token': data.token,
		// },
	})
	return res
}

