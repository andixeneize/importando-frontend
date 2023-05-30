import { useForm, handleSubmit } from "react-hook-form";
import styles from "@styles/registro.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addUser } from "@services/login";

const Formulario = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});


  const onSubmit = async (formData) => {
    console.log('Register')
    console.log(formData);
    
		const body = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
			email: formData.email,
			password: formData.password, //sha256(formData.password),
      fechaNacimiento: "20000101", //formData.fechaNacimiento,
      activo: true,
      plan: 0//formData.plan
		}

    addUser(body).then(async res => {
      if (res.status === 200) {
        console.log('200')
        console.log('response: ', res)
      } else if (res.status === 401) {
        // await sleep(100)
        // alert('Error: incorrect creedentials. ')
        console.log('401')
        console.log('response: ', res)
      } 
      else {
        console.log('login status: ' + res)
        alert(res)
      }
    })
    .catch(error => {
      console.log('Error: ', error)
      alert('Error: ' + error)
    })
  }

  return (
    <div className={styles.registerBox}>
      <h1>Formulario de registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col>
              <div id="usu">
                <label htmlFor="">Usuario</label>
                <input
                  type="text"
                  placeholder="Disabled"
                  {...register("usuario", {
                    required: false,
                    pattern: /^[a-zA-Z0-9\_\-]{4,15}$/,
                    disabled: true
                  })}
                />
                {errors.usuario?.type === "required" && (
                  <p className={styles.error}>El campo usuario es requerido</p>
                )}
                {errors.usuario?.type === "pattern" && (
                  <p className={styles.error}>
                    El nombre debe ser de 4 a 15 caracteres y solo contener
                    letras y/o numeros
                  </p>
                )}
              </div>
            </Col>
            <Col>
              <div id="nom">
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  {...register("nombre", {
                    required: true,
                    pattern: /^[a-zA\_\-]{4,15}$/,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p className={styles.error}>El campo nombre es requerido</p>
                )}
                {errors.nombre?.type === "pattern" && (
                  <p className={styles.error}>
                    El nombre debe ser de 4 a 15 caracteres y solo contener
                    letras
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="ape">
                <label htmlFor="">Apellido</label>
                <input
                  type="text"
                  placeholder="Ingrese su apellido"
                  {...register("apellido", {
                    required: true,
                    // pattern: /^[a-zA\_\-]{4,15}$/,
                  })}
                />
                {errors.apellido?.type === "required" && (
                  <p className={styles.error}>El campo apellido es requerido</p>
                )}
                {errors.apellido?.type === "pattern" && (
                  <p className={styles.error}>
                    El nombre debe ser de 4 a 15 caracteres y solo contener
                    letras
                  </p>
                )}
              </div>
            </Col>
            <Col>
              <div id="tel">
                <label htmlFor="">
                  Teléfono <small></small>
                </label>
                <input
                  type="tel"
                  placeholder="Ingrese su numero de teléfono"
                  {...register("telefono", {
                    required: true,
                    // pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
                  })}
                />
                {errors.telefono?.type === "required" && (
                  <p className={styles.error}>
                    El numero de teléfono es requerido
                  </p>
                )}
                {errors.telefono?.type === "pattern" && (
                  <p className={styles.error}>El formato es incorrecto</p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="em">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Ingrese su email"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className={styles.error}>El campo email es requerido</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className={styles.error}>
                    El formato del email es inválido
                  </p>
                )}
              </div>
            </Col>
            <Col>
              <div id="nac">
                <label htmlFor="">Fecha de nacimiento</label>
                <input
                  type="text"
                  placeholder="Disabled"
                  {...register("fechaNacimiento", {
                    required: false,
                    disabled: true
                  })}
                />
                {errors.fechaNacimiento?.type === "required" && (
                  <p className={styles.error}>
                    El campo fecha de nacimiento es requerido
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="pass">
                <label htmlFor="">Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...register("password", {
                    required: true,
                    pattern: /^.{4,12}$/,
                  })}
                />
                {errors.contraseña?.type === "required" && (
                  <p className={styles.error}>
                    El campo contraseña es requerido
                  </p>
                )}
                {errors.contraseña?.type === "pattern" && (
                  <p className={styles.error}>
                    La contraseña debe tener entre 4 y 12 caracteres
                  </p>
                )}
              </div>
            </Col>
            <Col>
              <div id="repass">
                <label htmlFor="">Repetir contraseña</label>
                <input
                  type="password"
                  placeholder="Repita su contraseña"
                  {...register("repetirContraseña", {
                    required: true,
                    pattern: /^.{4,12}$/,
                  })}
                />
                {errors.repetirContraseña?.type === "required" && (
                  <p className={styles.error}>
                    El campo contraseña es requerido
                  </p>
                )}
                {errors.repetirContraseña?.type === "pattern" && (
                  <p className={styles.error}>
                    La contraseña debe tener entre 4 y 12 caracteres
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <input type="submit" value="Enviar" />
            </Col>
            <Col>
              <input type="reset" value="Borrar" />
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default Formulario;

// Llamo a la funcion register con el operador spread para que almacene en un objeto los datos seleccionados.

// Con un objeto dentro de la funcion register, valido los datos con determinados parametros.

// Con el hook formState analizo el estado del campo, dentro de ese objeto uso la propiedad errors. dentro del campo
// con la propiedad tapy (errors.nombre.type) analizo el tipo de error que se comente. Con el operardo "?" si no hay un error no se continua analizando.
// luego agrego la condicion que debe cumplirse si hay error.

// En el campo email utilizo el metodo patter para validar la expresion regular de un email.

// Con la funcion watch puede saber que se esta escribiendo en un campo en tiempo real. Creo un div para recibir noticias, si el checkbox es marcado
// con la funcion condicional, con el uso de la funcion watch, se abre el nuevo campo para rellenar.

// Dentro del useForm puede ingresar valores por defectos con defaultValues.
