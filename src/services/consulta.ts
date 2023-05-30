import { useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'

const URLS = {
	CONSULTA: '/PostalNet/WSConsultar',
}

interface IConsultaRequest {
	token: string
}

export interface ICountry {
	country_id: number
	key: string
}

interface IConsultaResponse extends ISuccessResponse {
	data?: any
}

export const getConsulta = async (body: IConsultaRequest) => {
	const { data } = await api.get<IConsultaResponse>(URLS.CONSULTA, {
		headers: {
			'access-token': body.token,
		},
	})
	return data
}

export const useGetConsulta = (body: IConsultaRequest) => {
	return useQuery<IConsultaResponse, IErrorResponse<string>, IConsultaResponse>(
		['CONSULTA'],
		async () => await getConsulta(body),
		{
			retry: false,
			onError: error => {
				alert(error.response?.data?.message ?? 'Error')
			},
		}
	)
}
