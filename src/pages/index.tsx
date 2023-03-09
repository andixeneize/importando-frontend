import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@styles/index.module.css";

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

const Home: NextPage = () => {
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
          Recordarme <input type="checkbox" {...register("remember")} />
        </div>

        <input type="submit" />

        <a href="">Olvide mi contraseña</a> <br></br>
        <a href="">Crear una nueva cuenta</a>
      </form>
    </div>
  );

};

export default Home;
