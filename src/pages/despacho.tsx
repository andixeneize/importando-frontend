import type { GetServerSideProps, NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetDespacho } from "@services/despacho";
import { ISession } from "@services/login";
import { getSession } from "next-auth/react";
import BarraNav from "../Components/navbar";
import { useGetBultosUser } from "@services/bulto";
import { useGetZonas } from "@services/zona";
import { useEffect, useState } from "react";
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
  const consultaDefaultValues = {
    agencia: "",
    codigoBarra: "",
    errorCodigo: 0,
    errorDescripcion: "",
    etiqueta: "",
    fechaHora: "",
    fecha: "",
    fechaHorayyyyMMddHHmmss: "",
    idDespacho: "",
    localidadDestinoTiempost: "",
    precio: "",
    remito: "",
  };

  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const getDespacho = useGetDespacho();
  // const getZonas = useGetZonas({ token: session.user.accessToken });
  const getBultos = useGetBultosUser({ token: session.user.accessToken });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consulta, setConsulta] = useState(consultaDefaultValues);

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
    // console.log(formData);

    // console.log("Bultos del form: ", options);
    // console.log("Bulto elegido: ", formData.bultos);

    const body = {
      token: session.user.accessToken,
      cliente: formData.cliente,
      pwd: formData.pwd,
      generarRemito: formData.generarRemito,
      agenciaOrigen: formData.agenciaOrigen,
      claveExterna: formData.claveExterna,
      tipo: formData.tipo,
      Bulto_IdMirTrans: formData.producto,
      Bulto_Cantidad: formData.bultos,
      kilos: formData.kilos,
      destinatario: formData.destinatario,
      direccion: formData.direccion,
      localidad: formData.localidad,
      rut: formData.rut,
      valorCR: formData.valorCR, // "0.0",
      facturaCR: formData.facturaCR, // "1",
      telefonoDest: formData.telefonoDest,
      mailDest: formData.mailDest,
    };

    getDespacho.mutate(body, {
      onSuccess: (res) => {
        console.log("Despacho exitoso: ", res);
        notifySuccess("Consulta exitosa");
        setConsulta(res);
        setLoading(false);
      },
      onError: (error) => {
        console.log("Error de despacho");
        notifyError(error.response?.data?.title || "Error");
        setConsulta(consultaDefaultValues);
        setLoading(true);
      },
    });
  };

  const onReset = () => {
    reset();
  };

  const { refetch } = getBultos;

  useEffect(() => {
    refetch().then((res) => {
      const selectOptions = res.data?.map((option: any, index: any) => {
        if (index == 0) {
          return (
            <>
              <option selected value={0}>
                Seleccione un bulto
              </option>
              <option value={option.idBultoMirTrans}>{option.descripcion}</option>
            </>
          );
        }
        return (
          <option value={option.idBultoMirTrans}>{option.descripcion}</option>
        );
      });
      setOptions(selectOptions);
    });
  }, [refetch]);

  return (
    <div>
      <BarraNav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          bg="dark"
          key="consultar"
          text="white"
          style={{ width: "32rem", height: "fit-content" }}
          className="m-5"
        >
          <Card.Header as="h5" className="p-3">
            Despachar
          </Card.Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ListGroup>
              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Generar Remito</div>
                <select {...register("generarRemito")}>
                  <option value="N">No</option>
                  <option value="S">Si</option>
                </select>

              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Modo de pago</div>
                <select {...register("tipo")}>
                  <option value="C">Crédito - "C"</option>
                  <option value="A">A cobrar en destino - "A"</option>
                </select>
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Localidad</div>
                <input {...register("localidad")} placeholder="Maldonado" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Clave Externa</div>
                <input {...register("claveExterna")} placeholder="clave123" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Agencia de origen</div>
                <input {...register("agenciaOrigen")} placeholder="001" />
              </ListGroup.Item>

              {/*}
              <ListGroup.Item variant="dark" className="pb-3" >
                <div className="mb-1">Producto</div>
                <input {...register("producto")} placeholder="Tipo de bulto" />
              </ListGroup.Item>
              */}

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Bulto</div>
                <select {...register("producto")}>{options}</select>
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Cantidad de Bultos</div>
                <input
                  {...register("bultos")}
                  placeholder="Cantidad de bultos"
                />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Kilos</div>
                <input type="number" {...register("kilos")} placeholder="10" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Destinatario</div>
                <input {...register("destinatario")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Dirección</div>
                <input {...register("direccion")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Telefono destinatario</div>
                <input {...register("telefonoDest")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Email destinatario</div>
                <input {...register("mailDest")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Cliente</div>
                <input {...register("cliente")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Password</div>
                <input {...register("pwd")} type="password" />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">RUT</div>
                <input {...register("rut")} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Valor contrarrembolso</div>
                <input {...register("valorCR")} defaultValue={0.0} />
              </ListGroup.Item>

              <ListGroup.Item variant="dark" className="pb-3">
                <div className="mb-1">Factura contrarrembolso</div>
                <input {...register("facturaCR")} defaultValue={1} />
              </ListGroup.Item>
            </ListGroup>

            <Card.Body>
              <Button
                variant="secondary"
                type="button"
                onClick={onReset}
                className="mx-3"
              >
                Borrar
              </Button>
              <Button variant="primary" type="submit">
                Despachar
              </Button>
            </Card.Body>
          </form>
        </Card>

        <Card
          bg="dark"
          key="resultado-consulta"
          text="white"
          style={{ width: "32rem", height: "fit-content" }}
          className="m-5"
        >
          <Card.Header as="h5" className="p-3">
            Resultados
          </Card.Header>

          {loading && (
            <ListGroup>
              <ListGroup.Item variant="dark">No hay datos...</ListGroup.Item>
            </ListGroup>
          )}

          {!loading && (
            <ListGroup>
              <ListGroup.Item
                variant="dark"
                style={{ width: "32rem", height: "fit-content" }}
              ></ListGroup.Item>

              {consulta.errorCodigo != 0 && (
                <>
                  <ListGroup.Item variant="dark">
                    Código de Error: {consulta.errorCodigo}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    <div>Descripcion: </div>
                    <p>{consulta.errorDescripcion}</p>
                  </ListGroup.Item>
                </>
              )}

              {consulta.errorCodigo == 0 && (
                <>
                  <ListGroup.Item variant="dark">
                    Agencia: {consulta.agencia}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Código de Barra: {consulta.codigoBarra}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Etiqueta: {consulta.etiqueta}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Fecha: {consulta.fecha}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    ID Despacho: {consulta.idDespacho}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Destino: {consulta.localidadDestinoTiempost}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Precio: {consulta.precio}
                  </ListGroup.Item>
                  <ListGroup.Item variant="dark">
                    Remito: {consulta.remito}
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          )}
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
