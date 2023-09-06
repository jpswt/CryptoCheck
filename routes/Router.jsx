import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Crypto from '../src/pages/Crypto';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Portfolio from '../src/pages/Portfolio';

const Router = ({ search }) => {
	const [crypto, setCrypto] = useState([]);

	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en`;

	const loadCrypto = async () => {
		await axios.get(url).then((response) => {
			setCrypto(response.data);
			// console.log(response.data);
		});
	};

	useEffect(() => {
		loadCrypto();
	}, [url]);

	return (
		<Routes>
			<Route path="/" element={<Home crypto={crypto} search={search} />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/portfolio" element={<Portfolio />} />
			<Route path="/coin/:id" element={<Crypto />} />
		</Routes>
	);
};
export default Router;
