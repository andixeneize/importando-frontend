import type { NextPage } from 'next'
import {Container, Row, Col} from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from '@styles/index.module.css';


type Inputs = {
  example: string,
  exampleRequired: string,
};


const Home: NextPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it


// 	return <Container fluid>
//     <Row>
//       <Col>
//         <p>Home</p>
//       </Col>
//     </Row>
//     <Row>
//       <Col>
//         { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* register your input into the hook by invoking the "register" function */}
//           <input defaultValue="test" {...register("example")} />
          
//           {/* include validation with required or other standard HTML validation rules */}
//           <input {...register("exampleRequired", { required: true })} />
//           {/* errors will return when field validation fails  */}
//           {errors.exampleRequired && <span>This field is required</span>}
          
//           <input type="submit" />
//         </form>
//       </Col>
//     </Row>
//   </Container>
// }

return <div className={styles.loginBox}>
            <h1>Registrate</h1>
            <form action="">
                <label htmlFor="UserName">Nombre de usuario</label>
                <input type="text" placeholder='Ingrese su usuario'/>

                <label htmlFor="password">Contraseña</label>
                <input type="password" placeholder='Ingrese su contraseña'/>

                <div className={styles.remember}>Recordarme <input type="checkbox" name="recordarme" id="recordarme"/></div>
                
                <input type="submit"/>
                
                  <a href="">Olvide mi contraseña</a> <br></br>
                  <a href="">Crear una nueva cuenta</a>  

            </form>
      </div>


return <Container fluid>
<Row>
  <Col>
    <p>Home</p>
  </Col>
</Row>
<Row>
  <Col>
    { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  </Col>
</Row>
</Container>
}

export default Home
