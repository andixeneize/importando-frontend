import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'
import styles from "@styles/index.module.css";

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

const Home: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("username"));

  return (
    <div className={styles.loginBox}>
      <h1>Registrate</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="UserName">Nombre de usuario</label>
        <input type="text" placeholder="Ingrese su usuario" {...register("username")} />


        <label htmlFor="password">Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña" {...register("password")} />

        <div className={styles.remember}>
          <label className={styles.rememberContent}>Recordarme</label> 
          <input className={styles.rememberContent} type="checkbox" {...register("remember")} />
        </div>

        <input type="submit" />

        <div>
          <a href="">Olvide mi contraseña</a> <br></br>
          <a href="/registro">Crear una nueva cuenta</a>
        </div>

        <button type="button" className={styles.navButton} onClick={() => router.push('/despacho')}>
          Despachos
        </button>
      </form>
    </div>
  );

};

export default Home;
