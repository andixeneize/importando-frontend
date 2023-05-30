import type { NextPage } from "next";
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "@styles/consulta.module.css";
import { sleep } from "@utils/sleep";
import { useState } from "react";

const Consulta: NextPage = () => {
  const [loading, setLoading] = useState(true);

  async function consultar() {
    await sleep(1000)
    console.log('Consultando...')
    setLoading(!loading)
  }

  let consulta = {
    agencia: '001',
    claveExterna: 'prueba22',
    datosExtra: '',
    errorCodigo: 0,
    errorDescripcion: null,
    estadoCodigo: '',
    estadoDescripcion: null,
    fecha: '20230327',
    fechaEstado: '',
    lugarPersona: '',
    remito: 319281
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
          <Button variant="secondary" onClick={() => consultar()}>{loading? 'Consultar':'Resetear'}</Button>
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

        {!loading && (<ListGroup >
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

export default Consulta;

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
