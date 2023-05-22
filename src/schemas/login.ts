import { object, string } from 'yup'

export interface IFormLogin {
	email: string
	password: string
}

export const loginInitialValues: IFormLogin = {
	email: '',
	password: '',
}

export const loginSchema = object({
	email: string().trim().required('GRAL_REQUIRED'),
	password: string().trim().required('GRAL_REQUIRED'),
})

export interface IFormForgotPwd {
	email: string
}

export const forgotPwdInitialValues: IFormForgotPwd = {
	email: '',
}

export const forgotPwdSchema = object({
	email: string().trim().email('LOGIN_INVALmail_EMAIL').required('GRAL_REQUIRED'),
})
