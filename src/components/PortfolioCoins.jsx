import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PortfolioCoins = () => {
	const [coins, setCoins] = useState([]);
	const { user } = UserAuth();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
			setLoading(true);
			setCoins(doc.data()?.coinList);
			setLoading(false);
		});
	}, [user.email]);

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
				<span className="mr-6 text-3xl">Loading Crypto Data</span>
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	return (
		<div>
			{isLoading === false && coins.length === 0 ? (
				<p className="text-center">
					Currently no coins saved to your portfolio.{' '}
					<Link to="/">Click here to search for coins to add.</Link>
				</p>
			) : (
				<div>
					{coins.map((coin) => (
						<div key={coin.id}>
							<p onClick={() => deleteCoin(coin.id)}>delete</p>
							<p>{coin.name}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default PortfolioCoins;
