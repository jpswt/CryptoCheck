import { UserAuth } from '../context/AuthContext';

const Portfolio = () => {
	const { user } = UserAuth();
	return (
		<div className="mx-auto mt-4 max-w-[1200px] p-2">
			<h1 className="text-xl font-bold">Welcome, {user.email}</h1>
		</div>
	);
};
export default Portfolio;
