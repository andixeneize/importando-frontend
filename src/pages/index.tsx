import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'
import styles from "@styles/index.module.css";
import Button from 'react-bootstrap/Button';
import { login } from "@services/login";
import { sleep } from "@utils/sleep";
import { sha256 } from 'js-sha256';
import { signIn } from 'next-auth/react'


type Inputs = {
  email: string;
  password: string;
  // remember: boolean;
};

const Home: NextPage = () => {
  const router = useRouter()
  // const getPosts = useGetPosts()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    console.log('Submit')
    console.log(formData);
    
		const data = {
			mail: formData.email,
			password: sha256(formData.password),
		}

    login(data).then(res => {
      if (res.status === 200) {
        console.log('200')
        console.log('response: ', res)

      } else {
        console.log('login status: ' + res)
      }
    })
    .catch(error => {
      console.log('Error: ', error)
      alert(error)
    })
  }

  const onSubmit2: SubmitHandler<Inputs> = async (formData) => {
    console.log('Submit')
    console.log(formData);
    
		// setIsSubmitting(true)
		const login = await signIn('credentials', {
			mail: formData.email,
			password: formData.password, //sha256(formData.password),
			locale: router.locale,
			redirect: false,
		})

		if (login?.status === 401) {
			// setIsSubmitting(false)
			await sleep(100)
			// snackbar(login.error ?? t('LOGIN_INCORRECT_CREDENTIALS'), 'failure')
      alert('Error: incorrect creedentials. ' + login.error)
			// setUserFocus()
		} else if (login?.status === 200) {
			// setIsSubmitting(false)
			router.push('/cobros')
		}
		// loginReset()
  }

  
  return (
    <div className={styles.loginBox}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
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
        </div>
      </form>
    </div>
  );

};

export default Home;
