import { useEffect, useState } from 'react';
import CryptoCoin from './CryptoCoin';
import Search from './Search';

const CryptoSearch = ({ crypto }) => {
	const [search, setSearch] = useState('');

	const handleScrollY = (e) => {
		if (
			window.innerHeight + e?.target.documentElement.scrollTop + 1 >=
			e?.target.documentElement.scrollHeight
		) {
			console.log('at bottom');
		}
	};
	// console.log(search);

	useEffect(() => {
		window.addEventListener('scroll', handleScrollY());
	}, []);

	return (
		<div className="mx-auto my-4 w-full max-w-[1200px]   bg-primary px-2 font-bold">
			<div>
				<Search setSearch={setSearch} />
			</div>
			<table className="w-full table-auto border-collapse text-center ">
				<thead>
					<tr className="border-b">
						<th></th>
						<th className="pl-12 text-left">Coin</th>
						<th>Price</th>
						<th>24h</th>
						<th className="hidden md:table-cell">24h Volume</th>
						<th className="hidden lg:table-cell">Mkt Cap</th>
						<th>Last 7 days</th>
					</tr>
				</thead>
				<tbody>
					{crypto
						.filter((coin) => {
							if (
								search === '' ||
								coin.name.toLowerCase().includes(search.toLocaleLowerCase())
							) {
								return coin;
							}
						})
						.map((coin) => (
							<CryptoCoin coin={coin} key={coin.id} />
						))}
				</tbody>
			</table>
		</div>
	);
};
export default CryptoSearch;
