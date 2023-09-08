import PortfolioCoins from '../components/PortfolioCoins';
import { UserAuth } from '../context/AuthContext';

const Portfolio = () => {
	const { user } = UserAuth();

	const userName = user.email;
	return (
		<div className="z-0 mx-auto mt-4 max-w-[1200px] p-2">
			<h1 className="text-xl font-bold">Welcome, {userName?.split('@')[0]}</h1>
			<div className="mt-8">
				<PortfolioCoins />
			</div>
		</div>
	);
};
export default Portfolio;
