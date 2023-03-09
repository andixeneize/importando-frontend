import { object, type Schema, string } from 'yup'

export interface IFormLogin {
	id: string
	password: string
}

export const loginInitialValues: IFormLogin = {
	id: '',
	password: '',
}

export const loginSchema: Schema<IFormLogin> = object({
	id: string().trim().required('GRAL_REQUIRED'),
	password: string().trim().required('GRAL_REQUIRED'),
})

export interface IFormForgotPwd {
	email: string
}

export const forgotPwdInitialValues: IFormForgotPwd = {
	email: '',
}

export const forgotPwdSchema: Schema<IFormForgotPwd> = object({
	email: string().trim().email('LOGIN_INVALID_EMAIL').required('GRAL_REQUIRED'),
})
