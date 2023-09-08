import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrashAlt } from 'react-icons/fa';
import coinsLight from '../assets/images/coins-light.svg';
import coinsDark from '../assets/images/coins-dark.svg';
import { ThemeContext } from '../context/Theme';

const PortfolioCoins = () => {
	const { theme } = useContext(ThemeContext);
	const [coins, setCoins] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { user } = UserAuth();

	useEffect(() => {
		setLoading(true);
		onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
			setCoins(doc.data()?.coinList);
			setLoading(false);
		});
	}, [user.email]);

	// console.log(coins);

	const coinPath = doc(db, 'users', `${user.email}`);

	const deleteCoin = async (id) => {
		try {
			const filteredCoins = coins.filter((coin) => coin.id !== id);
			await updateDoc(coinPath, {
				coinList: filteredCoins,
			});
		} catch (err) {
			console.log(err.message);
		}
	};

	if (isLoading) {
		return (
			<div className=" flex min-h-[calc(100vh-400px)] items-center justify-center">
				<span className="mr-6 text-3xl">Loading Portfolio Data</span>
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	return (
		<div>
			{!isLoading && coins?.length === 0 ? (
				<div className="flex flex-col items-center">
					{theme === 'light' ? (
						<img src={coinsLight} alt="stack of coins" className="w-[400px]" />
					) : (
						<img src={coinsDark} alt="stack of coins" className="w-[400px]" />
					)}
					<p className="text-center text-xl font-bold">
						Currently no coins saved to your portfolio.{' '}
					</p>
					<p className="text-lg">
						<Link to="/home">
							<span className="font-bold text-accent hover:brightness-110">
								Click here
							</span>
						</Link>
						<span> to search for coins to add.</span>
					</p>
				</div>
			) : (
				<div>
					<div className="flex w-full items-center justify-center">
						<table className="w-[90%] table-auto border-collapse text-center md:max-w-[70%]">
							<thead>
								<tr className="border-b opacity-70">
									<th className="text-left">Asset</th>
									<th>Market Rank</th>
									<th>Pricing</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{coins.map((coin) => (
									<tr
										key={coin.id}
										className="h-[65px] overflow-hidden border-b"
									>
										<td>
											<div className="item-center text-md flex justify-start gap-2 font-semibold">
												<img
													className="h-8 w-8"
													src={coin.image}
													alt={coin.name}
												/>

												<Link to={`/coin/${coin.id}`}>
													<span className="mt-1">
														{coin.name} ({coin.symbol.toUpperCase()})
													</span>
												</Link>
											</div>
										</td>
										<td>{coin.rank}</td>
										<td>
											{new Intl.NumberFormat('en-EN', {
												style: 'currency',
												currency: 'USD',
											}).format(coin.price)}
										</td>
										<td>
											<p
												className="flex  justify-center"
												onClick={() => deleteCoin(coin.id)}
											>
												<FaTrashAlt className=" cursor-pointer text-2xl text-red-600" />
											</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};
export default PortfolioCoins;
