import { useQuery } from "@tanstack/react-query";
import { api, type ISuccessResponse, type IErrorResponse } from "@config/api";

const URLS = {
  BULTOS: "/Bulto/GetBultos",
  BULTOS_USER: "/Bulto/GetBultoByUsuario",
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

export const getBultos = async (body: IBultosRequest) => {
  const { data } = await api.get<any>(URLS.BULTOS, {
    headers: {
      Authorization: body.token,
    },
  });
  return data;
};

export const useGetBultos = (body: IBultosRequest) => {
  return useQuery<any, IErrorResponse<string>, any>(
    ["BULTOS"],
    async () => await getBultos(body),
    {
      retry: false,
      onError: (error) => {
        console.log("Error al obtener bultos: ", error);
      },
    }
  );
};

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
