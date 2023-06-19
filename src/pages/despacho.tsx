import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@styles/despacho.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IFormInput {
  cliente: String;
  pwd: String;
  generarRemito: String;
  agenciaOrigen: String;
  claveExterna: String;
  tipo: String;
  producto: String;
  bultos: String;
  kilos: String;
  destinatario: String;
  direccion: String;
  localidad: String;
  rut: String;
  valorCR: String;
  facturaCR: String;
  telefonoDest: String
  mailDest: String
}

/*
pruebas despacho
{
  "cliente": "1414",
  "pwd": "1414",
  "generarRemito": "N",
  "agenciaOrigen": "001",
  "claveExterna": "TestTestTest",
  "tipo": "C",
  "producto": "2",
  "bultos": 1,
  "kilos": 1,
  "destinatario": "aaaaaa",
  "direccion": "bbbbbb",
  "localidad": "maldonado",
  "rut": "213456777",
  "valorCR": 0.0,
  "facturaCR": "1",
  "telefonoDest": "11111111",
  "mailDest": "fake@email.com"
}
*/

const Despacho: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log('Despacho: Submit')
    console.log(formData);
  }

  return (
    <div className={styles.despachoBox}>
      <h1>Despachar</h1> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col> 
                <label >Generar Remito</label>
                <select  {...register("generarRemito")}>
                  <option value="N">No</option>
                  <option value="S">Si</option>
                </select>            
            </Col>
            <Col>
              <label >Modo de pago</label>
                <select  {...register("tipo")}>
                  <option value="C">Crédito (Mercado Pago)</option>
                  <option value="A">A cobrar en destino</option>
                </select>
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Clave Externa</label>
                <input  {...register("claveExterna")} />
            </Col>
            <Col>
                <label >Agencia de origen</label>
                <input  {...register("agenciaOrigen")} />
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Producto</label>
                <input  {...register("producto")} />
            </Col>
            <Col>
                <label >Bultos</label>
                <input type="number" {...register("bultos")} />
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Kilos</label>
                <input type="number" {...register("kilos")} />
            </Col>
            <Col>
                <label >Destinatario</label>
                <input  {...register("destinatario")} />
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Dirección</label>
                <input  {...register("direccion")} />
            </Col>
            <Col>
                <label >Localidad</label>
                <input  {...register("localidad")} />
            </Col>
          </Row>
          <Row>
            <Col>
                <label >Telefono destinatario</label>
                <input  {...register("telefonoDest")} />
            </Col>
            <Col>
                <label >Email destinatario</label>
                <input  {...register("mailDest")} />
            </Col>  
          </Row>
          <Row>
            <Col>
                <label >Cliente</label>
                <input  {...register("cliente")} />
            </Col>
            <Col>
                <label >Password</label>
                <input  {...register("pwd")} />
            </Col>
          </Row>
          <Row>
            <Col>
                <label >RUT</label>
                <input  {...register("rut")} />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
                <input type="submit" value="Enviar"/> 
            </Col>
            <Col>
                <input type="reset"  value="Borrar" />
            </Col>
          </Row>
        </Container>
      </form>
      </div>
    
  );
};

export default Despacho;
