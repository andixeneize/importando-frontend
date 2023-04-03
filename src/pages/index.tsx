import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'
import styles from "@styles/index.module.css";
import Button from 'react-bootstrap/Button';
import { useGetPosts } from "@services/login";


type Inputs = {
  email: string;
  password: string;
  // remember: boolean;
};

const Home: NextPage = () => {
  const router = useRouter()
  const getPosts = useGetPosts()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('Submit')
    console.log(data);
    console.log(getPosts.data)
    
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
        {/*
        <div className={styles.remember}>
          <label className={styles.rememberContent}>Recordarme</label> 
          <input className={styles.rememberContent} type="checkbox" {...register("remember")} />
        </div>
        */}

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
