import CryptoSearch from '../components/CryptoSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
	const [crypto, setCrypto] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en`;

	const loadCrypto = async () => {
		setIsLoading(true);
		await axios.get(url).then((response) => {
			setCrypto(response.data);
			// console.log(response.data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		loadCrypto();
	}, [url]);

	return (
		<div>
			<CryptoSearch crypto={crypto} isLoading={isLoading} />
		</div>
	);
};
export default Home;
