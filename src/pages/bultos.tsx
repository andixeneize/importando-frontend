import type { GetServerSideProps, NextPage } from 'next';
import BarraNav from "../Components/navbar";
import { useGetBultos } from '@services/bulto';
import { ISession } from '@services/login';
import { getSession } from 'next-auth/react';

interface IBultos {
  session: ISession;
}

const Bultos: NextPage<IBultos> = ({ session }) => {

	// Obtener bultos
	const getBultos = useGetBultos({ token: session.user.accessToken });

	return <div>
			<BarraNav/>
			<h1>Bultos</h1>
			{ getBultos.data?.map((data: any) => {
				return (
					<div>
						Data:  {data.descripcion}
					</div>
				)
			})}
		</div>
}

export default Bultos;

// Revisar que este logueado
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as ISession;

  if (session === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
