import { object, type Schema, string, ref } from 'yup'

export interface IFormResetPassword {
	password: string
	confirmPassword: string
}

export const resetPasswordInitialValues: IFormResetPassword = {
	password: '',
	confirmPassword: '',
}

export const resetPasswordSchema: Schema<IFormResetPassword> = object({
	password: string().trim().required('GRAL_REQUIRED').min(8, 'LOGIN_MUST_HAVE_8_CH'),
	confirmPassword: string()
		.trim()
		.required('GRAL_REQUIRED')
		.min(8, 'LOGIN_MUST_HAVE_8_CH')
		.oneOf([ref('password')], 'LOGIN_MUST_MATCH'),
})
