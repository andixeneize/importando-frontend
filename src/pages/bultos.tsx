import type { GetServerSideProps, NextPage } from "next";
import BarraNav from "../Components/navbar";
import { useAddBulto, useGetBulto } from "@services/bulto";
import { ISession, useGetLogged } from "@services/login";
import { getSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface IBultos {
  session: ISession;
}

interface IFormInput {
  descripcion: string;
  idBultoMirtrans: number;
}

const Bultos: NextPage<IBultos> = ({ session }) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const getBulto = useGetBulto({ token: session.user.accessToken });
  const getLogged = useGetLogged({ token: session.user.accessToken });
  const addBulto = useAddBulto();

  const notifySuccess = (text: string) =>
  toast.success(text, {
    position: "top-right",
  });

const notifyError = (text: string) =>
  toast.error(text, {
    position: "top-right",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log("Agregando bulto...");
    console.log("Logged user: ", getLogged.data);

    // plan 1: premium, plan 2: base
    const body = {
      descripcion: formData.descripcion,
      idBultoMirTrans: formData.idBultoMirtrans,
      planPremium: getLogged.data?.plan === 1,
      planBase: getLogged.data?.plan === 2,
      token: session.user.accessToken,
      activo: true
    };

    console.log(body);
    addBulto.mutate(body, {
      onSuccess: (res) => {
        console.log("Bulto agregado: ", res);
        notifySuccess("Bulto agregado");
        getBulto.refetch();
        reset();
      },
      onError: (error) => {
        console.log("Error al agregar bulto");
        notifyError(error.response?.data?.title || "Error al agregar bulto");
      },
    });
  };

  const onReset = () => {
    reset();
  };

  return (
    <div>
      <BarraNav />

      <div className="d-flex mt-5 justify-content-around">
        {/* LISTADO DE BULTOS */}
        <div className="card text-white bg-dark" style={{ width: '24rem'}}>

          <div className="card-header">
              <h5 className="card-title py-2">Bultos</h5>
            </div>

          <div className="list-group" style={{ width: '24rem' }}>
            {getBulto.data?.map((data: any) => {
              return <div className="list-group-item list-group-item-dark">{data.descripcion}</div>
            })}
          </div>
        </div>

        {/* NUEVO BULTO */}
        <div className="d-flex flex-column">
          <div className="card text-white bg-dark" style={{ width: '24rem'}}>
            <div className="card-header">
              <h5 className="card-title py-2">Agregar Bulto</h5>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="my-3">
                <p className="mb-2 card-text">Descripción:</p>
                <input {...register("descripcion")} placeholder="Bulto de hasta 5kg" style={{ width: '100%'}} />
              </div>  

              <div className="my-3">
                <p className="mb-2 card-text">ID Mirtrans:</p>
                <input {...register("idBultoMirtrans")} placeholder="151"  style={{ width: '100%'}} />
              </div> 

              <div className="mt-5 text-end">
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
      </div>
      <Toaster />
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
