import { useForm, handleSubmit, } from "react-hook-form";

const Formulario = () =>{

    const {register, formState: {errors}, watch, handleSubmit} = useForm({
        
    });

    const onSubmit = (data) =>  {
        console.log(data)
    }

    const recibirNoticias = watch("recibirNoticias");

    return <div>
         <h2>Formulario de registro</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="">Nombre</label>
                <input type="text" {...register("nombre", {
                    required: true,
                    maxLength: 10,
                })} />
                {errors.nombre?.type === "required" && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === "maxLength" && <p>El campo nombre no debe tener mas de diez caracteres.</p>}
            </div>
            <div>
                <label htmlFor="">Apellido</label>
                <input type="text"  {...register("apellido",{
                    required:true,
                    maxLength:10,
                })}  />
                {errors.apellido?.type === "required" && <p>El campo apellido es requerido</p>}
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="text"  {...register("email",{
                    required:true,
                   pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/    
                })}  />
                {errors.email?.type === "required" && <p>El campo email es requerido</p>}
                {errors.email?.type === "pattern" && <p>El formato del email es inválido</p>}
            </div>
            <div>
                <label htmlFor="">Edad</label>
                <input type="text"  {...register("edad",{
                    required:true,
                    min:18,
                })}  />
                {errors.edad?.type === "required" && <p>El campo edad es requerido</p>}
                {errors.edad?.type === "min" && <p>La edad no puede ser menor a 18</p>}
            </div> 
            <div>
                <label htmlFor="">Pais de origen</label>
                <select  {...register("pais")}>
                    <option value="argentina">Argentina</option>
                    <option value="uruguayr">Uruguay</option>
                    <option value="brasil">Brasil</option>
                    <option value="chile">Chile</option>
                </select>
            </div>
            <div>
                <label>¿Quiere recibir noticias semanales de nuestra empresa en su celular?</label>
                <input type="checkbox" {...register("recibirNoticias")}/>
            </div>
                {recibirNoticias && (
                    <div>
                        <label >Telefono celular</label>
                        <input type="text" {...register("telefono")} />
                    </div>      
                )}
            <input type="submit" value="Enviar" />
         </form>
    </div>  
}
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
