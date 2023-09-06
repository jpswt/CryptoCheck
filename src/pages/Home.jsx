import CryptoSearch from '../components/CryptoSearch';

const Home = ({ crypto }) => {
	return (
		<div>
			<CryptoSearch crypto={crypto} />
		</div>
	);
};
export default Home;
