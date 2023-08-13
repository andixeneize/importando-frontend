import { useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'

const URLS = {
	BULTOS: '/Bulto/GetBultos',
}

export interface IBultosRequest {
	token: string
}

export interface IBultoResponse {
	data: IBulto[]
}

export interface IBulto {
	idBulto: number
	descripcion: string
}

export const getBultos = async (body: IBultosRequest) => {
	console.log('BULTOS BODY ', body)
	const { data } = await api.get<any>(URLS.BULTOS, {
		headers: {
			'Authorization': body.token,
		},
	})
	return data
}

export const useGetBultos = (body: IBultosRequest) => {
	return useQuery<any, IErrorResponse<string>, any>(
		['BULTOS'],
		async () => await getBultos(body),
		{
			retry: false,
			onError: error => {
				console.log(error.response?.data?.message ?? 'Error', 'failure')
			},
		}
	)
}



/* 

export const getKpis = async (token: string) => {
	const { data } = await api.get<IKpis>(URLS.KPIS, {
		headers: {
			'access-token': token,
		},
	})
	return data
}

export const useGetKPIInstitutions = (token: string) => {
	const { snackbar } = useSnackbar()
	return useQuery<IKpis, IErrorResponse<string>, IKpis>(
		['INSTITUTIONS KPIS'],
		async () => await getKpis(token),
		{
			retry: false,
			onError: error => {
				snackbar(error.response?.data?.message ?? 'Error', 'failure')
			},
		}
	)
}

*/