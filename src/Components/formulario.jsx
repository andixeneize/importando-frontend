import { useForm, handleSubmit, } from "react-hook-form";
import styles from "@styles/registro.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Formulario = () =>{

    const {register, formState: {errors}, watch, handleSubmit} = useForm({
        
    });

    const onSubmit = (data) =>  {
        console.log(data)
    }

   
    return   <div className={styles.registerBox}>
        <h1>Formulario de registro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Row>
            <Col><div id="usu">
                    <label htmlFor="">Usuario</label>
                    <input type="text" placeholder="Ingrese su usuario"  {...register("usuario",{
                    required:true,
                    pattern:   /^[a-zA-Z0-9\_\-]{4,15}$/,
                    })}  />
                    {errors.usuario?.type === "required" && <p className={styles.error}>El campo usuario es requerido</p>}
                    {errors.usuario?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras y/o numeros</p>}
                </div>
            </Col>
            <Col>
                <div id="nom">
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder="Ingrese su nombre" {...register("nombre", {
                    required: true,
                    pattern:  /^[a-zA\_\-]{4,15}$/,
                    })} />
                    {errors.nombre?.type === "required" && <p className={styles.error}>El campo nombre es requerido</p>}
                    {errors.nombre?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras</p>}
                </div>
            </Col>
          </Row>
          <Row>
            <Col><div id="ape">
                    <label htmlFor="">Apellido</label>
                    <input type="text" placeholder="Ingrese su apellido" {...register("apellido",{
                    required:true,
                    pattern:  /^[a-zA\_\-]{4,15}$/,
                    })}  />
                    {errors.apellido?.type === "required" && <p className={styles.error}>El campo apellido es requerido</p>}
                    {errors.apellido?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras</p>}
                </div>
            </Col>
            <Col><div id="tel">
                    <label htmlFor="">Teléfono <small>Formato: 123-456-7890</small></label>
                    <input type="tel" placeholder="Ingrese su numero de teléfono"  {...register("telefono",{
                    required:true,
                    pattern:/[0-9]{3}-[0-9]{3}-[0-9]{4}/,
                    })}  />
                    {errors.telefono?.type === "required" && <p className={styles.error}>El numero de teléfono es requerido</p>}
                    {errors.telefono?.type === "pattern" && <p className={styles.error}>El formato es incorrecto</p>}
                </div>
            </Col>
          </Row>
          <Row>
            <Col><div id="em">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Ingrese su email"  {...register("email",{
                    required:true,
                   pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/    
                    })}  />
                    {errors.email?.type === "required" && <p className={styles.error}>El campo email es requerido</p>}
                    {errors.email?.type === "pattern" && <p className={styles.error}>El formato del email es inválido</p>}
                </div>
            </Col>
            <Col><div id="nac">
                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type="date" id="start" name="trip-start" min="1900-01-01" max="2022-12-31" placeholder="dd/mm/aaaa" {...register("nacimiento",{
                    required:true,   
                    })}/>  
                    {errors.nacimiento?.type === "required" && <p className={styles.error}>El campo fecha de nacimiento es requerido</p>}
                </div>
            </Col>
          </Row>
          <Row>
            <Col><div id="pass">
                    <label htmlFor="">Contraseña</label>
                    <input type="password" placeholder="Ingrese su contraseña"  {...register("contraseña",{
                    required:true,
                    pattern:/^.{4,12}$/,   
                    })}  />
                    {errors.contraseña?.type === "required" && <p className={styles.error}>El campo contraseña es requerido</p>}
                    {errors.contraseña?.type === "pattern" && <p className={styles.error}>La contraseña debe tener entre 4 y 12 caracteres</p>}
                </div>
            </Col>
            <Col><div id="repass">
                    <label htmlFor="">Repetir contraseña</label>
                    <input type="password" placeholder="Repita su contraseña" {...register("repetirContraseña",{
                    required:true,
                    pattern:/^.{4,12}$/,   
                    })}  />
                    {errors.repetirContraseña?.type === "required" && <p className={styles.error}>El campo contraseña es requerido</p>}
                    {errors.repetirContraseña?.type === "pattern" && <p className={styles.error}>La contraseña debe tener entre 4 y 12 caracteres</p>}
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
        
    }

    export default Formulario;

    // return <div className={styles.registerBox}>
    //      <h1>Formulario de registro</h1>
    //      <form onSubmit={handleSubmit(onSubmit)}>
    //         <div id="usu">
    //              <label htmlFor="">Usuario</label>
    //             <input type="text" placeholder="Ingrese su usuario"  {...register("usuario",{
    //                 required:true,
    //                 pattern:   /^[a-zA-Z0-9\_\-]{4,15}$/,
    //             })}  />
    //             {errors.usuario?.type === "required" && <p className={styles.error}>El campo usuario es requerido</p>}
    //             {errors.usuario?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras y/o numeros</p>}
    //         </div>
    //         <div id="nom">
    //             <label htmlFor="">Nombre</label>
    //             <input type="text" placeholder="Ingrese su nombre" {...register("nombre", {
    //                 required: true,
    //                 pattern:  /^[a-zA\_\-]{4,15}$/,
    //             })} />
    //             {errors.nombre?.type === "required" && <p className={styles.error}>El campo nombre es requerido</p>}
    //             {errors.nombre?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras</p>}
    //         </div>
    //         <div id="ape">
    //             <label htmlFor="">Apellido</label>
    //             <input type="text" placeholder="Ingrese su apellido" {...register("apellido",{
    //                 required:true,
    //                 pattern:  /^[a-zA\_\-]{4,15}$/,
    //             })}  />
    //             {errors.apellido?.type === "required" && <p className={styles.error}>El campo apellido es requerido</p>}
    //             {errors.apellido?.type === "pattern" && <p className={styles.error}>El nombre debe ser de 4 a 15 caracteres y solo contener letras</p>}
    //         </div>
    //         <div id="tel">
    //             <label htmlFor="">Teléfono <small>Formato: 123-456-7890</small></label>
    //             <input type="tel" placeholder="Ingrese su numero de teléfono"  {...register("telefono",{
    //                 required:true,
    //                 pattern:/[0-9]{3}-[0-9]{3}-[0-9]{4}/,
    //             })}  />
    //             {errors.telefono?.type === "required" && <p className={styles.error}>El numero de teléfono es requerido</p>}
    //             {errors.telefono?.type === "pattern" && <p className={styles.error}>El formato es incorrecto</p>}
    //         </div>
            // <div id="em">
            //     <label htmlFor="">Email</label>
            //     <input type="text" placeholder="Ingrese su email"  {...register("email",{
            //         required:true,
            //        pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/    
            //     })}  />
            //     {errors.email?.type === "required" && <p className={styles.error}>El campo email es requerido</p>}
            //     {errors.email?.type === "pattern" && <p className={styles.error}>El formato del email es inválido</p>}
            // </div>
            // <div id="pass">
            //     <label htmlFor="">Contraseña</label>
            //     <input type="password" placeholder="Ingrese su contraseña"  {...register("contraseña",{
            //         required:true,
            //        pattern:/^.{4,12}$/,   
            //     })}  />
            //     {errors.contraseña?.type === "required" && <p className={styles.error}>El campo contraseña es requerido</p>}
            //     {errors.contraseña?.type === "pattern" && <p className={styles.error}>La contraseña debe tener entre 4 y 12 caracteres</p>}
            // </div>
            // <div id="repass">
            //     <label htmlFor="">Repetir contraseña</label>
            //     <input type="password" placeholder="Repita su contraseña" {...register("repetirContraseña",{
            //         required:true,
            //        pattern:/^.{4,12}$/,   
            //     })}  />
            //     {errors.repetirContraseña?.type === "required" && <p className={styles.error}>El campo contraseña es requerido</p>}
            //     {errors.repetirContraseña?.type === "pattern" && <p className={styles.error}>La contraseña debe tener entre 4 y 12 caracteres</p>}
            // </div>
            // <div id="nac">
            //     <label htmlFor="">Fecha de nacimiento</label>
            //     <input type="date" id="start" name="trip-start" min="1900-01-01" max="2022-12-31" {...register("nacimiento",{
            //         required:true,   
            //     })}/>  
            //     {errors.nacimiento?.type === "required" && <p className={styles.error}>El campo fecha de nacimiento es requerido</p>}
            // </div>
    //         <br />
    //         <input type="submit" value="Enviar" />
    //      </form>
    // </div>  

// Llamo a la funcion register con el operador spread para que almacene en un objeto los datos seleccionados.

// Con un objeto dentro de la funcion register, valido los datos con determinados parametros.

// Con el hook formState analizo el estado del campo, dentro de ese objeto uso la propiedad errors. dentro del campo
// con la propiedad tapy (errors.nombre.type) analizo el tipo de error que se comente. Con el operardo "?" si no hay un error no se continua analizando.
// luego agrego la condicion que debe cumplirse si hay error.

// En el campo email utilizo el metodo patter para validar la expresion regular de un email.

// Con la funcion watch puede saber que se esta escribiendo en un campo en tiempo real. Creo un div para recibir noticias, si el checkbox es marcado
// con la funcion condicional, con el uso de la funcion watch, se abre el nuevo campo para rellenar.

// Dentro del useForm puede ingresar valores por defectos con defaultValues.
