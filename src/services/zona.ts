import { useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'

const URLS = {
	ZONAS: '/Zona/GetZonas',
}

export interface IZonasRequest {
	token: string
}

export interface IZonaResponse extends ISuccessResponse {
	locaZona: number
	agencia: number
	nombre_Zona: string
}

export const getZonas = async (body: IZonasRequest) => {
	const { token } = body
	const { data } = await api.get<IZonaResponse>(URLS.ZONAS, {
		headers: {
			'Authorization': token,
		},
	})
	return data
}

export const useGetZonas = (body: IZonasRequest) => {
	return useQuery<IZonaResponse, IErrorResponse<IZonasRequest>, IZonasRequest>(
		['ZONAS'],
		async () => await getZonas(body),
		{
			retry: false,
			onError: error => {
				console.log('Error al obtener zonas: ', error)
			},
		}
	)
}