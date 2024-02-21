import type { NextPage } from 'next'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import styles from "@styles/index.module.css";
import Button from 'react-bootstrap/Button';
import { sleep } from "@utils/sleep";
import { signIn } from 'next-auth/react'
var sha256 = require('sha-256-js');
import { signOut } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';


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

  const notifySuccess = (text: string) => toast.success(text, {
    position: 'top-right',
  });

  const notifyError = (text: string) => toast.error(text, {
    position: 'top-right',
  });

  const onSubmitLogin = handleLoginSubmit(async (formData) => {    
		const login = await signIn('credentials', {
			email: formData.email,
			password: sha256(formData.password), // formData.password,
      locale: router.locale,
			redirect: false,
		})

		if (login?.status === 401) {
			await sleep(100)
      notifyError('Error de credenciales')
		} else if (login?.status === 200) {
      notifySuccess('Login exitoso')
      router.push('/consulta')
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
            {/* <Button variant="link" className={styles.navButton} onClick={() => router.push('/recuperacion')}>Olvide mi contraseña</Button> */} 
            <Button variant="link" className={styles.navButton} onClick={() => signOut()}>Desconectarse</Button>  
        </div>
      </form>
      <Toaster />
    </div>
  );

};

export default Login;
