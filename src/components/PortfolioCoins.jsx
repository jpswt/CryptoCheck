import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PortfolioCoins = () => {
	const [coins, setCoins] = useState([]);
	const { user } = UserAuth();

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
			setCoins(doc.data()?.coinList);
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

	return (
		<div>
			{coins?.length === 0 ? (
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
