import type { NextPage } from 'next'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import styles from "@styles/index.module.css";
import Button from 'react-bootstrap/Button';
import { sleep } from "@utils/sleep";
import { signIn } from 'next-auth/react'
var sha256 = require('sha-256-js');
import { signOut } from 'next-auth/react'


type Inputs = {
  email: string;
  password: string;
  // remember: boolean;
};

const Login: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit: handleLoginSubmit,
    reset: loginReset,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmitLogin = handleLoginSubmit(async (formData) => {
    console.log('Submit')
    console.log(formData);
    
		const login = await signIn('credentials', {
			email: formData.email,
			password: formData.password, //sha256(formData.password),
      locale: router.locale,
			redirect: false,
		})


		if (login?.status === 401) {
			await sleep(100)
      alert('Error: incorrect creedentials. ')
		} else if (login?.status === 200) {
      router.push('/')
		}

		loginReset()
  })

  return(
    <div className={styles.loginBox}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={onSubmitLogin}>
        
          <label htmlFor="UserName">Email</label>
          <input type="text" placeholder="Ingrese su email" {...register("email", { required: true })} />
          {errors.email && <span className={styles.error}>Este campo es obligatorio</span>}
    

        
          <label htmlFor="password">Contraseña</label>
          <input type="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
          {errors.password && <div className={styles.error}>Este campo es obligatorio</div>}
        
       
          <input type="submit" value="Ingresar" />
          
          <div className={styles.botonera}>
            <Button variant="link" className={styles.navButton} onClick={() => router.push('/registro')}>Crear una nueva cuenta</Button>
            <Button variant="link" className={styles.navButton} onClick={() => router.push('/recuperacion')}>Olvide mi contraseña</Button>  
            <Button variant="link" className={styles.navButton} onClick={() => signOut()}>Desconectarse</Button>  
        </div>
      </form>
    </div>
  );

};

export default Login;
