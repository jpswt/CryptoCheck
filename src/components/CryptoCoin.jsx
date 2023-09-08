import { IoAddCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const CryptoCoin = ({ coin }) => {
	const [savedCoin, setSavedCoin] = useState(false);
	const { user } = UserAuth();

	const coinSavedPath = doc(db, 'users', `${user?.email}`);
	const storeCoin = async () => {
		if (user?.email) {
			setSavedCoin(true);
			await updateDoc(coinSavedPath, {
				coinList: arrayUnion({
					id: coin.id,
					name: coin.name,
					symbol: coin.symbol,
					image: coin.image,
					price: coin.current_price,
					rank: coin.market_cap_rank,
				}),
			});
		} else {
			alert('Please sign in to add a coin to your portfolio');
		}
	};

	return (
		<>
			<tr className="h-[85px] overflow-hidden border-b">
				<td className="w-[20px] pl-2 pr-6" onClick={storeCoin}>
					<IoAddCircle className="cursor-pointer text-2xl font-extrabold text-accent" />
				</td>

				<td className="text-left lg:w-[280px]">
					<div className="flex items-center sm:w-[200px] sm:gap-2">
						<img
							src={coin.image}
							alt={`${coin.name} image logo`}
							className=" w-6 rounded-full"
						/>
						<Link to={`/coin/${coin.id}`}>
							<p className="hidden sm:table-cell">{coin.name}</p>
						</Link>

						<div className="pl-6 text-primary sm:pl-0 sm:opacity-70">
							<Link to={`/coin/${coin.id}`}>{coin.symbol.toUpperCase()}</Link>
						</div>
					</div>
				</td>
				<td>
					{new Intl.NumberFormat('en-EN', {
						style: 'currency',
						currency: 'USD',
					}).format(coin.current_price)}
				</td>
				<td
					className={
						coin.price_change_percentage_24h < 0
							? ' text-red-500'
							: ' text-green-500'
					}
				>
					{coin.price_change_percentage_24h.toFixed(1)}%
				</td>
				<td className="hidden md:table-cell">
					${coin.total_volume.toLocaleString()}
				</td>
				<td className="hidden lg:table-cell">
					${coin.market_cap.toLocaleString()}
				</td>
				<td className="lg:w-[200px]">
					<Sparklines data={coin.sparkline_in_7d.price}>
						<SparklinesLine
							color={
								coin.price_change_percentage_24h < 0 ? '#ef4444' : '#22c55e'
							}
							style={{ fill: 'none', strokeWidth: '2' }}
						/>
					</Sparklines>
				</td>
			</tr>
		</>
	);
};
export default CryptoCoin;
