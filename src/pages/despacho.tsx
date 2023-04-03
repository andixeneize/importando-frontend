import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@styles/despacho.module.css";
import Container from 'react-bootstrap/Container';

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
    <Container className="text-center my-5">
      <h1 className={styles.title}>Despacho</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Remito</label>
        <input className={styles.field} {...register("generarRemito")} />

				<label>Agencia de origen</label>
        <input className={styles.field} {...register("agenciaOrigen")} />

				<label>Clave Externa</label>
        <input className={styles.field} {...register("claveExterna")} />

        <label>Tipo (Modo de pago)</label>
        <select className={styles.select} {...register("tipo")}>
          <option value="C">Crédito (Mercado Pago)</option>
          <option value="A">A cobrar en destino</option>
        </select>

				<label>Producto</label>
        <input className={styles.field} {...register("producto")} />

				<label>Bultos</label>
        <input className={styles.field} {...register("bultos")} />

				<label>Kilos</label>
        <input className={styles.field} {...register("kilos")} />

				<label>Destinatario</label>
        <input className={styles.field} {...register("destinatario")} />

				<label>Dirección</label>
        <input className={styles.field} {...register("direccion")} />

				<label>Localidad</label>
        <input className={styles.field} {...register("localidad")} />

				<label>RUT</label>
        <input className={styles.field} {...register("rut")} />
				
        <input type="submit" className={styles.submit} value="Enviar"/>
      </form>
    </Container>
  );
};

export default Despacho;
