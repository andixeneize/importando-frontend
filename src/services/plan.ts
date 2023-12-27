import { useQuery } from "@tanstack/react-query";
import { api, type ISuccessResponse, type IErrorResponse } from "@config/api";

const URLS = {
  PLAN: "/Plan/GetPlan",
};

export interface IPlanRequest {
  token: string;
}

export const getPlan = async (body: IPlanRequest) => {
  const { data } = await api.get<any>(URLS.PLAN, {
    headers: {
      Authorization: body.token,
    },
  });
  return data;
};

export const useGetPlan = (body: IPlanRequest) => {
  return useQuery<any, IErrorResponse<string>, any>(
    ["PLAN"],
    async () => await getPlan(body),
    {
      retry: false,
      onError: (error) => {
        console.log("Error al obtener el plan: ", error);
      },
    }
  );
};
