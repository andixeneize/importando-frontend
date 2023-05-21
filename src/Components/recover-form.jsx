import { useForm, handleSubmit, } from "react-hook-form";
import styles from "@styles/recuperar.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecuperarForm = () => {

    const { register, formState: {errors}, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }
 

    return <div className={styles.conteiner}>
            <h1>Recuperar contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Container>
                <Row>
                    <Col> 
                    <div className={styles.child}>
                            <label htmlFor="">Ingrese su email </label>
                            <input type="text"  placeholder="Ingrese su email" {...register("email",{required: true, pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ })} />
                            {errors.email?.type === "required" && <span className={styles.error}>Este campo es obligatorio</span>} 
                            {errors.email?.type === "pattern" && <span className={styles.error}>El formato del email es incorrecto</span>}
                            <input type="submit" value="Enviar código" />
                    </div>
                    </Col>
                    <Col>
                    <div className={styles.child}>
                            <label htmlFor="">Ingrese el código recibido en su email</label>
                            <input type="text"  placeholder="Ingrese el código" {...register("codigo",{required: true,})} />
                            {errors.codigo && <span className={styles.error}>Este campo es obligatorio</span>}
                            <input type="submit" value="Confirmar codigo" />
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className={styles.child}>  
                            <label htmlFor="">Ingrese su nueva contraseña</label>
                            <input type="password"  placeholder="Ingrese su nueva contraseña" {...register("contraseña", {required: true,})} />
                            {errors.contraseña && <span className={styles.error}>Este campo es obligatorio</span>}
                    </div>
                    </Col>
                    <Col>
                    <div className={styles.child}> 
                            <label htmlFor="">Repita su nueva contraseña</label>
                            <input type="password"  placeholder="Repita su nueva contraseña" {...register("contraseña2", {required: true,})} />
                            {errors.contraseña2 && <span className={styles.error}>Este campo es obligatorio</span>}
                    </div>
                    </Col>
                </Row>
            </Container>
           

           
                <input type="submit" value="Enviar"/>
           

            </form> 

    </div>  
}






export default RecuperarForm;