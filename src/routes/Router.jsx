import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Crypto from '../pages/Crypto';
import { UserAuth } from '../context/AuthContext';
import Portfolio from '../pages/Portfolio';
import Landing from '../pages/Landing';

const Router = () => {
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

	const { user } = UserAuth();
	return (
		<Routes>
			<Route path="/" element={<Landing crypto={crypto} />} />
			<Route
				path="/home"
				element={
					user ? <Home crypto={crypto} isLoading={isLoading} /> : <Login />
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/portfolio" element={user ? <Portfolio /> : <Login />} />
			<Route path="/coin/:id" element={<Crypto />} />
		</Routes>
	);
};
export default Router;
