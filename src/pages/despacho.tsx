import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@styles/despacho.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IFormInput {
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
}

const Despacho: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.despachoBox}>
      <h1>Despacho</h1> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col> 
                <label >Remito</label>
                <input  {...register("generarRemito")} />
            </Col>
            <Col>
                <label >Agencia de origen</label>
                <input  {...register("agenciaOrigen")} />
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Clave Externa</label>
                <input  {...register("claveExterna")} />
            </Col>
            <Col>
              <label >Tipo (Modo de pago)</label>
                <select  {...register("tipo")}>
                  <option value="C">Crédito (Mercado Pago)</option>
                  <option value="A">A cobrar en destino</option>
                </select>
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Producto</label>
                <input  {...register("producto")} />
            </Col>
            <Col>
                <label >Bultos</label>
                <input  {...register("bultos")} />
            </Col>
          </Row>
          <Row>
            <Col> 
                <label >Kilos</label>
                <input  {...register("kilos")} />
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
                <label >RUT</label>
                <input  {...register("rut")} />
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
