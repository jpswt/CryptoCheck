import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const CryptoCoin = ({ coin }) => {
	return (
		<>
			<tr className="h-[85px] overflow-hidden border-b">
				<td className="w-[20px] pl-2 pr-6">
					<IoHeartOutline />
				</td>

				<td className="text-left lg:w-[280px]">
					<div className="flex items-center gap-2 sm:w-[200px]">
						<img
							src={coin.image}
							alt={`${coin.name} image logo`}
							className=" w-6 rounded-full"
						/>
						<Link to={`/coin/${coin.id}`}>
							<p className="hidden sm:table-cell">{coin.name}</p>
						</Link>

						<div className="text-secondary opacity-80">
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
