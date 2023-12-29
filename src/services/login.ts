import { useMutation, useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'
import type { IFormLogin, IFormRegister } from '@schemas/login'

const URLS = {
	LOGIN: '/Usuario/Login',
	FORGOTPWD: '/Usuario/resetPassword',
	REGISTER: '/Usuario/Create',
	LOGGED: '/Usuario/GetUsuarioLogueado',
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
				alert('Error: ' + error)
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
		email: string
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

// Register

export const addUser = async (body: IFormRegister) => {
	const res = await api.post<any>(URLS.REGISTER, body)
	return res
}

export interface IRequest {
  token: string;
}

export const getLogged = async (body: IRequest) => {
  const { data } = await api.get<any>(URLS.LOGGED, {
    headers: {
      Authorization: body.token,
    },
  });
  return data;
};

export const useGetLogged = (body: IRequest) => {
  return useQuery<any, IErrorResponse<string>, any>(
    ["LOGGED"],
    async () => await getLogged(body),
    {
      retry: false,
      onError: (error) => {
        console.log("Error al obtener el usuario: ", error);
      },
    }
  );
};
