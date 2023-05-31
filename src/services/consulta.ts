import { useMutation, useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'

const URLS = {
	CONSULTA: '/PostalNet/WSConsultar',
}

export interface IConsultaRequest {
	cliente: string,
	pwd: string,
	claveExterna:string,
	fecha: string,
	token: string
}

export interface ICountry {
	country_id: number
	key: string
}

export interface IConsultaResponse extends ISuccessResponse {
	agencia: string,
	claveExterna: string,
	datosExtra: string,
	errorCodigo: string,
	errorDescripcion: string,
	estadoCodigo: string,
	estadoDescripcion: string,
	fecha: string,
	fechaEstado: string,
	lugarPersona: string,
	remito: string
}

export const getConsulta = async (body: IConsultaRequest) => {
	const { token, ...restOfBody } = body
	const { data } = await api.post<IConsultaResponse>(URLS.CONSULTA, restOfBody, {
		headers: {
			'Authorization': body.token,
		},
	})
	return data
}

export const useGetConsulta = () => {
	return useMutation<IConsultaResponse, IErrorResponse<IConsultaRequest>, IConsultaRequest>(
		['CONSULTA'],
		getConsulta,
		{
			onError: error => {
				console.log('Error: ', error)
			},
			onSuccess: res => {
				console.log('Success: ', res)
			},
		}
	)
}