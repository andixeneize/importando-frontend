import { useMutation } from '@tanstack/react-query'
import { api, type IResponseError } from '@config/api'
import { useSnackbar } from '@contexts/Snackbar'

const URLS = {
	RESET_PWD: 'users/reset_password',
}

// Forgot password

interface IResResetPwd {
	body?: {
		message: string
	}
	code: number
	error?: string
}

export interface IReqResetPwd {
	password: string
}

export const putResetPwd = async (body: IReqResetPwd) => {
	const { data } = await api.put<IResResetPwd>(
		URLS.RESET_PWD +
			'/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwibGFuZyI6ImVzIiwiaWF0IjoxNjc2NTAyMDM1fQ.-yrvCn_eQmlMupWRSd1qsys6xF069i3CSTr4HlTnim8',
		body,
		{
			headers: {
				'access-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwibGFuZyI6ImVzIiwiaWF0IjoxNjc2NTAyMDM1fQ.-yrvCn_eQmlMupWRSd1qsys6xF069i3CSTr4HlTnim8',
			},
		}
	)
	return data
}

export const useResetPassword = () => {
	const { snackbar } = useSnackbar()
	return useMutation<IResResetPwd, IResponseError<IReqResetPwd>, IReqResetPwd>(
		['PUT_RESET_PWD'],
		putResetPwd,
		{
			onError: error => {
				snackbar(error.response?.data.error ?? 'Error', 'failure')
			},
		}
	)
}
