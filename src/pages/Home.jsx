import CryptoSearch from '../components/CryptoSearch';

const Home = ({ crypto, isLoading }) => {
	return (
		<div>
			<CryptoSearch crypto={crypto} isLoading={isLoading} />
		</div>
	);
};
export default Home;
