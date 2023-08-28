import type { GetServerSideProps, NextPage } from "next";
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "@styles/consulta.module.css";
import { useState } from "react";
import { useGetConsulta, IConsultaResponse } from "@services/consulta";
import type { ISession } from '@services/login'
import { getSession } from "next-auth/react";
import BarraNav from "../Components/navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface IConsulta {
  session: ISession
}

interface IFormInput {
  cliente: string,
  pwd: string,
  claveExterna:string,
  fecha: string
}

const Consulta: NextPage<IConsulta> = ({ session }) => {
  const consultaDefaultValues = {
    agencia: '',
    claveExterna: '',
    datosExtra: '',
    errorCodigo: '',
    errorDescripcion: '',
    estadoCodigo: '',
    estadoDescripcion: '',
    fecha: '',
    fechaEstado: '',
    lugarPersona: '',
    remito: ''
  }
  const [loading, setLoading] = useState(true);
  const [consulta, setConsulta] = useState(consultaDefaultValues);
  const getConsulta = useGetConsulta()
  const {
    register,
    handleSubmit,
    reset
  } = useForm<IFormInput>()

  const notifySuccess = (text: string) =>
    toast.success(text, {
      position: "top-right",
  });

  const notifyError = (text: string) =>
    toast.error(text, {
      position: "top-right",
  });

  /*
    const body = {
      cliente: "1112",
      pwd: "Ag.1234",
      claveExterna: "prueba22",
      fecha: "",
      token: session.user.accessToken,
    }
 */

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log("Despachando...");
    console.log(formData);

    const body = {
      cliente: formData.cliente,
      pwd: formData.pwd,
      claveExterna:formData.claveExterna,
      fecha: formData.fecha,
      token: session.user.accessToken
    };

    getConsulta.mutate(body, {
			onSuccess: (res) => {
        notifySuccess('Consulta exitosa')
        setConsulta(res)
        console.log('consulta: ', consulta)
        setLoading(false)
			},
      onError: (error) => {
        notifyError(error.response?.data?.title || "Error");
        setConsulta(consultaDefaultValues)
        setLoading(true)
			},
		})
  };

  const onReset = () => {
    reset()
  }

  return (
    
    <div className={styles.container}>
      <BarraNav/>
      <div style={{ display: 'flex' }}>
        <Card
          bg="dark"
          key="consultar"
          text="white"
          style={{ width: '24rem', height: 'fit-content' }}
          className="m-5">
          <Card.Header as="h5" className="p-3">Consultas</Card.Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ListGroup>
            <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Cliente:</div>
                <input {...register("cliente")}  placeholder="1112" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Password:</div>
                <input {...register("pwd")} placeholder="Ag.1234" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Clave Externa:</div>
                <input {...register("claveExterna")} placeholder="prueba22" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Fecha:</div>
                <input {...register("fecha")} placeholder="20230607" />
              </ListGroup.Item>
            </ListGroup>

            <Card.Body>
              <Button variant="secondary" type="button" onClick={onReset} className="mx-3">Borrar</Button>
              <Button variant="primary" type="submit">Consultar</Button>
            </Card.Body>
          </form>
        </Card>

        <Card
          bg="dark"
          key="resultado-consulta"
          text="white"
          style={{ width: '24rem', height: 'fit-content' }}
          className="m-5">
          <Card.Header as="h5" className="p-3">Resultados</Card.Header>

          {loading && (<ListGroup >
            <ListGroup.Item variant="dark">No hay datos...</ListGroup.Item>
          </ListGroup>)}

          { !loading && (<ListGroup >
            <ListGroup.Item variant="dark">Agencia: {consulta.agencia}</ListGroup.Item>
            <ListGroup.Item variant="dark">Clave Externa: {consulta.claveExterna}</ListGroup.Item>
            <ListGroup.Item variant="dark">Datos Extra: {consulta.datosExtra}</ListGroup.Item>
            <ListGroup.Item variant="dark">Error Codigo: {consulta.errorCodigo}</ListGroup.Item>
            <ListGroup.Item variant="dark">Error Descripcion: {consulta.errorDescripcion}</ListGroup.Item>
            <ListGroup.Item variant="dark">Estado Codigo: {consulta.estadoCodigo}</ListGroup.Item>
            <ListGroup.Item variant="dark">Estado Descripcion: {consulta.estadoDescripcion}</ListGroup.Item>
            <ListGroup.Item variant="dark">Fecha: {consulta.fecha}</ListGroup.Item>
            <ListGroup.Item variant="dark">Fecha Estado: {consulta.fechaEstado}</ListGroup.Item>
            <ListGroup.Item variant="dark">Lugar Persona: {consulta.lugarPersona}</ListGroup.Item>
            <ListGroup.Item variant="dark">Remito: {consulta.remito}</ListGroup.Item>
          </ListGroup>)}
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default Consulta;

export const getServerSideProps: GetServerSideProps = async context => {
	const session = (await getSession(context)) as ISession

	if (session === null) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: {
			session,
		},
	}
}


/*
{
  "cliente": "1112",
  "pwd": "Ag.1234",
  "claveExterna": "prueba22",
  "fecha": ""
}
{
  "agencia": "001",
  "claveExterna": "prueba22                                          ",
  "datosExtra": "",
  "errorCodigo": "0",
  "errorDescripcion": null,
  "estadoCodigo": "",
  "estadoDescripcion": null,
  "fecha": "20230327",
  "fechaEstado": "",
  "lugarPersona": "",
  "remito": "319281"
}

Consulta:
ingresar fecha y clave externa

Usuario y pass depende la cuenta:
Si tiene que lo ingrese

*/