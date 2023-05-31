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

interface IHome {
  session: ISession
}

const Home: NextPage<IHome> = ({ session }) => {
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


  async function consultar() {
    console.log('Consultando...')
    setLoading(true)

    const body = {
      cliente: "1112",
      pwd: "Ag.1234",
      claveExterna: "prueba22",
      fecha: "",
      token: session.user.accessToken,
    }

    getConsulta.mutate(body, {
			onSuccess: (res) => {
        setConsulta(res)
        console.log('consulta: ', consulta)
        setLoading(false)
			},
      onError: (error) => {
        console.log('Error: ', error)
			},
		})
  }

  return (
    <div className={styles.container}>
      <Card
        bg="dark"
        key="consultar"
        text="white"
        style={{ width: '24rem' }}
        className="m-5">
        <Card.Header as="h5" className="p-3">Consultas</Card.Header>

        <ListGroup >
          <ListGroup.Item variant="dark">Cliente: 1112</ListGroup.Item>
          <ListGroup.Item variant="dark">Password: *******</ListGroup.Item>
          <ListGroup.Item variant="dark">Clave Externa ********</ListGroup.Item>
          <ListGroup.Item variant="dark">Fecha: -</ListGroup.Item>
        </ListGroup>

        <Card.Body>
          <Button variant="secondary" onClick={() => consultar()}>Consultar</Button>
        </Card.Body>
      </Card>

      <Card
        bg="dark"
        key="resultado-consulta"
        text="white"
        style={{ width: '24rem' }}
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
  );
};

export default Home;

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
*/
