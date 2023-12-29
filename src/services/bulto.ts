import { useMutation, useQuery } from "@tanstack/react-query";
import { api, type ISuccessResponse, type IErrorResponse } from "@config/api";

const URLS = {
  BULTOS: "/Bulto/GetBulto",
  BULTOS_USER: "/Bulto/GetBultoByUsuario",
  BULTOS_ADD: "/Bulto/AddBulto"
};

export interface IBultosRequest {
  token: string;
}

export interface IBultoResponse {
  data: IBulto[];
}

export interface IBulto {
  idBulto: number;
  descripcion: string;
}

// Para Admin
export const getBulto = async (body: IBultosRequest) => {
  const { data } = await api.get<any>(URLS.BULTOS, {
    headers: {
      Authorization: body.token,
    },
  });
  return data;
};

export const useGetBulto = (body: IBultosRequest) => {
  return useQuery<any, IErrorResponse<string>, any>(
    ["BULTOS"],
    async () => await getBulto(body),
    {
      retry: false,
      onError: (error) => {
        console.log("Error al obtener bultos: ", error);
      },
    }
  );
};

// Para usuario segun plan y usuario
export const getBultosUser = async (body: IBultosRequest) => {
  const { data } = await api.get<any>(URLS.BULTOS_USER, {
    headers: {
      Authorization: body.token,
    },
  });
  return data;
};

export const useGetBultosUser = (body: IBultosRequest) => {
  return useQuery<any, IErrorResponse<string>, any>(
    ["BULTOS_USER"],
    async () => await getBultosUser(body),
    {
      retry: false,
      onError: (error) => {
        console.log("Error al obtener bultos: ", error);
      },
    }
  );
};

export interface IBultoAddRequest {
	idBultoMirTrans: number
	token: string
  descripcion: string
  planPremium: boolean
  planBase: boolean
  activo: boolean
}

const addBulto = async (body: IBultoAddRequest) => {
	const { token, ...restOfBody } = body
	const { data } = await api.post<any>(URLS.BULTOS_ADD, restOfBody, {
		headers: {
			Authorization: token,
		},
	})
	return data
}

export const useAddBulto = () => {
	return useMutation<any, IErrorResponse<IBultoAddRequest>, IBultoAddRequest>(
		['ADD_BULTO'],
		addBulto,
		{
			onError: error => {
				console.log('Error al agregar bulto', error)
			},
			onSuccess: res => {
				console.log('Bulto agregado', res)
			},
		}
	)
}
