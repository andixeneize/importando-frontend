import type { NextPage } from 'next'
import Cards from "../Components/cards";
import BarraNav from "../Components/navbar";

const Home: NextPage = () => {
	return <div><BarraNav/> 
	<Cards/>
	</div>;
	
	
	 
	
}

export default Home;
