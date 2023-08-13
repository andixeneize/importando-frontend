import type { GetServerSideProps, NextPage } from "next";
import Cards from "../Components/cards";
import BarraNav from "../Components/navbar";
import { ISession } from "@services/login";
import { getSession } from "next-auth/react";

interface IHome {
  session: ISession
}

const Home: NextPage<IHome> = ({ session }) => {
  return (
    <div>
      <BarraNav />
      <Cards />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
	const session = (await getSession(context)) as ISession

	if (session === null) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: {
			session,
		},
	}
}