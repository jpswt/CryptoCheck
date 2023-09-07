import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Crypto from '../src/pages/Crypto';
import { UserAuth } from '../src/context/AuthContext';
import Portfolio from '../src/pages/Portfolio';

const Router = () => {
	const { user } = UserAuth();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/portfolio" element={user ? <Portfolio /> : <Home />} />
			<Route path="/coin/:id" element={<Crypto />} />
		</Routes>
	);
};
export default Router;
