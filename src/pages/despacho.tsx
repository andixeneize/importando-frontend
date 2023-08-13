import type { GetServerSideProps, NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@styles/despacho.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetDespacho } from "@services/despacho";
import { ISession } from "@services/login";
import { getSession } from "next-auth/react";
import BarraNav from "../Components/navbar";
import { useGetBultos } from "@services/bulto";
import { useGetZonas } from "@services/zona";
import { useEffect, useState } from "react";
import Select from 'react-select'

interface IFormInput {
  cliente: string;
  pwd: string;
  generarRemito: string;
  agenciaOrigen: string;
  claveExterna: string;
  tipo: string;
  producto: string;
  bultos: string;
  kilos: string;
  destinatario: string;
  direccion: string;
  localidad: string;
  rut: string;
  valorCR: string;
  facturaCR: string;
  telefonoDest: string
  mailDest: string
}

interface IDespacho {
  session: ISession
}
const Despacho: NextPage<IDespacho> = ({ session }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const getDespacho = useGetDespacho()
  const getZonas = useGetZonas({ token: session.user.accessToken })
  const getBultos = useGetBultos({ token: session.user.accessToken })
  const [options, setOptions] = useState([]);


  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log(formData);
    console.log('Despachando...')

    const body = {
      token: session.user.accessToken,
      cliente: formData.cliente,
      pwd: formData.pwd,
      generarRemito: formData.generarRemito,
      agenciaOrigen: formData.agenciaOrigen,
      claveExterna: formData.claveExterna,
      tipo: formData.tipo,
      producto: formData.producto,
      bultos: formData.bultos,
      kilos: formData.kilos,
      destinatario: formData.destinatario,
      direccion: formData.direccion,
      localidad: formData.localidad,
      rut: formData.rut,
      valorCR: "0.0", // formData.valorCR,
      facturaCR: "1", // formData.facturaCR,
      telefonoDest: formData.telefonoDest,
      mailDest: formData.mailDest
    }

    getDespacho.mutate(body, {
			onSuccess: (res) => {
        console.log('response: ', res)
			},
      onError: (error) => {
        console.log('Error: ', error)
			},
		})
  }

  const { refetch } = getBultos

	useEffect(() => {
		refetch().then((res) => {
      const selectOptions = res.data?.map(
        (option: any) => {
          return ({ label: option.descripcion, value: option.idBulto})
        }
      )
      setOptions(selectOptions)
    })
	}, [refetch])

  return (
    <div>
      <BarraNav/>
    <div className={styles.despachoBox}>
      <h1 className="mt-3">Despachar</h1> 
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
                <Select options={options} />
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
          <Row className="mt-3">
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
      </div>
    
  );
};

export default Despacho;


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