import { useMutation, useQuery } from '@tanstack/react-query'
import { api, type IQueryResponse, type IResponseError } from '@config/api'
import type { IFormLogin } from '@schemas/login'

const URLS = {
	LOGIN: '/auth/login',
	TOKEN: '/getToken',
	FORGOTPWD: '/auth/reset-password-email',
	POSTS: '/posts'
}

// Forgot password

interface IResForgotPwd extends IQueryResponse{
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
		{ email: body.email },
		{ params: { lang: body.lang } }
	)
	return data
}

export const usePostForgotPwd = () => {
	console.log('usePostForgotPwd => snackbar')
	/*
	const { snackbar } = useSnackbar()
	return useMutation<IResForgotPwd, IResponseError<IForgotPwd>, IForgotPwd>(
		['POST_FORGOT_PWD'],
		postForgotPwd,
		{
			onError: error => {
				snackbar(error.response?.data.message ?? 'Error', 'failure')
			},
		}
	)
	*/
}

// Get token

interface IToken {
	token: string
}

export const getToken = async () => {
	const { data } = await api.get<IToken>(URLS.TOKEN)
	return data
}

export const useGetToken = () => {
	console.log('useGetToken => snackbar')

	/*
	const { snackbar } = useSnackbar()
	return useQuery<IToken, IResponseError<string>, IToken>(['GET_TOKEN'], getToken, {
		enabled: false,
		retry: false,
		onError: error => {
			snackbar(error.message, 'failure')
		},
	})
	*/
}

// Login

export interface ILoginResponse extends IQueryResponse {
	data?: {
		username: string
		lang: string
		token: string
	}
}

export interface ISession {
	expires: string
	user: {
		username: string
		accessToken: string
		lang: string
		roles: string[]
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



export const getPosts = async () => {
	console.log('getPosts')
	const { data } = await api.get<any>(URLS.POSTS)
	return data
}

export const useGetPosts = () => {
	// const { snackbar } = useSnackbar()
	return useQuery<any>(
		['POSTS'],
		async () => await getPosts(),
		{
			retry: false,
			onError: error => {
				//snackbar(error.response?.data?.message ?? 'Error', 'failure')
				console.log('Error')
			},
		}
	)
}
