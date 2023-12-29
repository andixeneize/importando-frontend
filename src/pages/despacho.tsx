import type { GetServerSideProps, NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetDespacho } from "@services/despacho";
import { ISession } from "@services/login";
import { getSession } from "next-auth/react";
import BarraNav from "../Components/navbar";
import { useGetBultosUser } from "@services/bulto";
import { useGetZonas } from "@services/zona";
import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import { Card, ListGroup } from "react-bootstrap";

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
  telefonoDest: string;
  mailDest: string;
}

interface IDespacho {
  session: ISession;
}

const Despacho: NextPage<IDespacho> = ({ session }) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const getDespacho = useGetDespacho();
  const getZonas = useGetZonas({ token: session.user.accessToken });
  const getBultos = useGetBultosUser({ token: session.user.accessToken });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consulta, setConsulta] = useState('');

  const notifySuccess = (text: string) =>
    toast.success(text, {
      position: "top-right",
    });

  const notifyError = (text: string) =>
    toast.error(text, {
      position: "top-right",
    });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log("Despachando...");
    console.log(formData);

    console.log('Bultos del form: ', options)
    console.log('Bulto elegido: ', formData.bultos)

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
      mailDest: formData.mailDest,
    };

    getDespacho.mutate(body, {
      onSuccess: (res) => {
        console.log("Despacho exitoso: ", res);
        notifySuccess('Consulta exitosa')
        setConsulta(JSON.stringify(res, null, 2))
        setLoading(false)
      },
      onError: (error) => {
        console.log("Error de despacho");
        notifyError(error.response?.data?.title || "Error");
        setConsulta('')
        setLoading(true)
      },
    });
  };

  const onReset = () => {
    reset()
  }

  const { refetch } = getBultos;

  useEffect(() => {
    refetch().then((res) => {
      const selectOptions = res.data?.map((option: any) => {
        return { label: option.descripcion, value: option.idBultoMirTrans };
      });
      setOptions(selectOptions);
    });
  }, [refetch]);

  return (
    <div>
      <BarraNav />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          bg="dark"
          key="consultar"
          text="white"
          style={{ width: '32rem', height: 'fit-content' }}
          className="m-5">
          <Card.Header as="h5" className="p-3">Despachar</Card.Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ListGroup>
              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Generar Remito</div>
                <select {...register("generarRemito")}>
                  <option value="N">No</option>
                  <option value="S">Si</option>
                </select>
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Modo de pago</div>
                <select {...register("tipo")}>
                  <option value="C">Crédito - "C"</option>
                  <option value="A">A cobrar en destino - "A"</option>
                </select>
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Localidad</div>
                <input {...register("localidad")} placeholder="Maldonado" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Clave Externa</div>
                <input {...register("claveExterna")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Agencia de origen</div>
                <input {...register("agenciaOrigen")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Producto</div>
                <input {...register("producto")} placeholder="Tipo de bulto" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Bultos</div>
                <input {...register("bultos")} placeholder="Cantidad de bultos" />

                {/* <Select options={options} /> */}
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Kilos</div>
                <input type="number" {...register("kilos")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Destinatario</div>
                <input {...register("destinatario")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Dirección</div>
                <input {...register("direccion")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Telefono destinatario</div>
                <input {...register("telefonoDest")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Email destinatario</div>
                <input {...register("mailDest")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
              <div className="mb-1">Cliente</div>
                <input {...register("cliente")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Password</div>
                <input {...register("pwd")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">RUT</div>
                <input {...register("rut")} />
              </ListGroup.Item>
            </ListGroup>

            <Card.Body>
              <Button variant="secondary" type="button" onClick={onReset} className="mx-3">Borrar</Button>
              <Button variant="primary" type="submit">Despachar</Button>
            </Card.Body>
          </form>
        </Card>

        <Card
          bg="dark"
          key="resultado-consulta"
          text="white"
          style={{ width: '32rem', height: 'fit-content' }}
          className="m-5">
          <Card.Header as="h5" className="p-3">Resultados</Card.Header>

          {loading && (<ListGroup >
            <ListGroup.Item variant="dark">No hay datos...</ListGroup.Item>
          </ListGroup>)}

          { !loading && (<ListGroup >
            <ListGroup.Item variant="dark" style={{ width: '32rem', height: 'fit-content' }}>
              <div>Despacho: </div>
              <div>
                <pre>
                  {consulta}
                </pre>
              </div>
            </ListGroup.Item>
          </ListGroup>)}
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default Despacho;

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
