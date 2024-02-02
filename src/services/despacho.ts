import { useMutation, useQuery } from '@tanstack/react-query'
import { api, type ISuccessResponse, type IErrorResponse } from '@config/api'

const URLS = {
	DESPACHO: '/PostalNet/WSDespachar',
}

export interface IDespachoRequest {
	token: string
  cliente: string;
  pwd: string;
  generarRemito: string;
  agenciaOrigen: string;
  claveExterna: string;
  tipo: string;
  producto: string;
  bultos: string;
  kilos: string;
  destinatario: string;
  direccion: string;
  localidad: string;
  rut: string;
  valorCR: string;
  facturaCR: string;
  telefonoDest: string
  mailDest: string
}

export interface IDespachoResponse extends ISuccessResponse {
	agencia: string
	codigoBarra: string
	errorCodigo: number
	errorDescripcion: string
	etiqueta: string
	fechaHora: string
	fecha: string
	fechaHorayyyyMMddHHmmss: string
	idDespacho: string
	localidadDestinoTiempost: string
	precio: string
	remito: string
}

export const getDespacho = async (body: IDespachoRequest) => {
	const { token, ...restOfBody } = body
	const { data } = await api.post<IDespachoResponse>(URLS.DESPACHO, restOfBody, {
		headers: {
			'Authorization': body.token,
		},
	})
	return data
}

export const useGetDespacho = () => {
	return useMutation<IDespachoResponse, IErrorResponse<IDespachoRequest>, IDespachoRequest>(
		['DESPACHO'],
		getDespacho,
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
