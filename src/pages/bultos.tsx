import type { GetServerSideProps, NextPage } from "next";
import BarraNav from "../Components/navbar";
import { useGetBultosUser } from "@services/bulto";
import { ISession } from "@services/login";
import { getSession } from "next-auth/react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetPlan } from "@services/plan";

interface IBultos {
  session: ISession;
}

interface IFormInput {
  descripcion: string;
  idBultoMirtrans: number;
}

const Bultos: NextPage<IBultos> = ({ session }) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();


  const getBultos = useGetBultosUser({ token: session.user.accessToken });
  // const getPlan = useGetPlan({ token: session.user.accessToken });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log("Agregando bulto...");
    console.log("Session: ", session);

    const body = {
      descripcion: formData.descripcion,
      idBultoMirtrans: formData.idBultoMirtrans,
      planPremium: true,
      planBase: true,
      token: session.user.accessToken,
    };

    console.log(body);
  };

  const onReset = () => {
    reset();
  };

  return (
    <div>
      <BarraNav />

      {/* LISTADO DE BULTOS */}
      <div className="d-flex flex-column mt-5 ms-5">
        <h1 className="text-light my-5">Bultos</h1>
        {getBultos.data?.map((data: any) => {
          return <div className="text-light">{data.descripcion}</div>;
        })}
      </div>

      {/* NUEVO BULTO */}
      <div className="d-flex flex-column mt-5 ms-5">
        <h3 className="text-light ">Agregar Bulto</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-1">Descripción:</div>
            <input {...register("descripcion")} placeholder="Descripcion" />

            <div className="mb-1">ID Mirtrans:</div>
            <input {...register("idBultoMirtrans")} placeholder="ID Mirtrans" />

          </div>  
          <div className="mt-5">
            <Button
              variant="secondary"
              type="button"
              onClick={onReset}
              className="me-3"
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bultos;

// Revisar que este logueado
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as ISession;

  if (session === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
