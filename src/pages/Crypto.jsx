import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Sparklines,
	SparklinesBars,
	SparklinesLine,
	SparklinesReferenceLine,
} from 'react-sparklines';
import axios from 'axios';
import DOMPurify from 'dompurify';
import RankBtn from '../components/RankBtn';
import Label from '../components/Label';

const Crypto = () => {
	const [coin, setCoin] = useState();
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(false);

	const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`;

	const loadCoin = async () => {
		setIsLoading(true);
		await axios.get(url).then((response) => {
			setCoin(response.data);
			// console.log(response.data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		loadCoin();
	}, []);

	if (isLoading) {
		return (
			<div className=" flex min-h-[calc(100vh-400px)] items-center justify-center">
				<span className="mr-6 text-3xl">Loading Crypto Data</span>
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}
	console.log(coin);

	return (
		<div className="mx-auto mt-8 max-w-[1200px] px-2 pb-8">
			<div className="mx-2 pt-4">
				<RankBtn>Rank #{coin?.market_cap_rank}</RankBtn>
				<div className="flex items-center gap-3 py-2">
					<img className="h-[60px] w-[60px]" src={coin?.image?.large} alt="" />
					<h1 className=" text-2xl font-semibold">{coin?.name}</h1>
					<p className=" text-xl text-gray-400">
						{coin?.symbol?.toUpperCase()}
					</p>
				</div>
			</div>
			<div className="mx-6 pb-6">
				{coin?.market_data?.current_price ? (
					<p className="text-3xl font-bold">
						<span>
							{new Intl.NumberFormat('en-EN', {
								style: 'currency',
								currency: 'USD',
							}).format(coin?.market_data?.current_price?.usd)}{' '}
						</span>
						<span className="text-xl">USD</span>
					</p>
				) : null}
			</div>

			<div className="grid gap-x-4 gap-y-0 px-2 md:grid-cols-2 lg:grid-cols-3 ">
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2">
					<p className=" text-secondary">Market Cap</p>
					{coin?.market_data?.market_cap ? (
						<p className="font-bold">
							${coin?.market_data?.market_cap?.usd.toLocaleString()}
						</p>
					) : null}
				</div>
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2">
					<p className=" text-secondary">Circulating Supply</p>
					{coin?.market_data?.circulating_supply ? (
						<p className="font-bold">
							${coin?.market_data?.circulating_supply?.toLocaleString()}
						</p>
					) : null}
				</div>
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2 ">
					<p className=" text-secondary">24 Hour Trading Volume</p>
					{coin?.market_data?.circulating_supply ? (
						<p className="font-bold">
							${coin?.market_data?.circulating_supply?.toLocaleString()}
						</p>
					) : null}
				</div>
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2">
					<p className=" text-secondary">Total Volume</p>
					{coin?.market_data?.total_volume ? (
						<p className="font-bold">
							${coin?.market_data?.total_volume?.usd.toLocaleString()}
						</p>
					) : null}
				</div>
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2">
					<p className=" text-secondary">Total supply</p>
					{coin?.market_data?.total_supply ? (
						<p className="font-bold">
							${coin?.market_data?.total_supply?.toLocaleString()}
						</p>
					) : null}
				</div>
				<div className="flex items-center justify-between border-b-2 border-table px-2 py-2">
					<p className=" text-secondary">Max supply</p>
					{coin?.market_data?.max_supply ? (
						<p className="font-bold">
							${coin?.market_data?.max_supply?.toLocaleString()}
						</p>
					) : (
						<p>Not Available</p>
					)}
				</div>
			</div>

			<div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3">
				<div className="col-span-2 m-2">
					<div className="mb-6">
						<h2 className="  text-2xl font-semibold ">
							{coin?.name} Price Chart ({coin?.symbol?.toUpperCase()})
						</h2>
						<p className="mb-6 text-lg text-gray-400">7 Day Price</p>
						<Sparklines data={coin?.market_data?.sparkline_7d?.price}>
							<SparklinesLine
								color={
									coin?.market_data?.price_change_percentage_24h < 0
										? '#ef4444'
										: '#22c55e'
								}
								style={{ strokeWidth: '1' }}
							/>
							<SparklinesReferenceLine
								type="mean"
								style={{
									stroke: 'var(--color-text-primary)',
									strokeOpacity: 0.25,
									strokeDasharray: '2,2',
								}}
							/>
						</Sparklines>
					</div>

					<div className="m-1 flex justify-evenly rounded-md border-2 border-table">
						<Label percentage={coin?.market_data?.price_change_percentage_24h}>
							24h
						</Label>
						<Label percentage={coin?.market_data?.price_change_percentage_7d}>
							7d
						</Label>
						<Label percentage={coin?.market_data?.price_change_percentage_14d}>
							14d
						</Label>
						<Label percentage={coin?.market_data?.price_change_percentage_30d}>
							30
						</Label>
						<Label percentage={coin?.market_data?.price_change_percentage_1y}>
							1y
						</Label>
					</div>
				</div>

				<div className="col-span-2 m-2 rounded-md bg-accent p-4 md:col-span-2 lg:col-span-1">
					<h2 className="mb-6 text-2xl font-semibold">
						{coin?.symbol.toUpperCase()} Price Statistics (USD)
					</h2>
					<div className=" border-b-2 border-table py-3">
						<div className="flex items-center justify-between">
							<p className="text-md text-secondary">{coin?.name} Price</p>
							{coin?.market_data?.current_price ? (
								<p className="text-md font-semibold">
									<span>
										{new Intl.NumberFormat('en-EN', {
											style: 'currency',
											currency: 'USD',
										}).format(coin?.market_data?.current_price?.usd)}{' '}
									</span>
								</p>
							) : null}
						</div>
					</div>
					<div className="border-b-2 border-table py-3">
						<div className="flex items-center justify-between">
							<div className="flex flex-1 justify-between ">
								<div>
									<p className="text-md text-secondary">24h Low</p>
									{coin?.market_data?.low_24h ? (
										<p className="text-md font-semibold">
											<span>
												{new Intl.NumberFormat('en-EN', {
													style: 'currency',
													currency: 'USD',
												}).format(coin?.market_data.low_24h.usd)}{' '}
											</span>
										</p>
									) : null}
								</div>
								<div>
									<p className="text-md text-secondary">24h High</p>
									{coin?.market_data?.high_24h ? (
										<p className="text-md font-semibold">
											<span>
												{new Intl.NumberFormat('en-EN', {
													style: 'currency',
													currency: 'USD',
												}).format(coin?.market_data.high_24h.usd)}{' '}
											</span>
										</p>
									) : null}
								</div>
							</div>
						</div>
					</div>

					<div className=" border-b-2 border-table py-3">
						<div className="flex items-center justify-between">
							<div className="flex flex-1 justify-between ">
								<div>
									<p className="text-md text-secondary">7d Low</p>
									{coin?.market_data?.sparkline_7d?.price ? (
										<p className="text-md font-semibold">
											<span>
												{new Intl.NumberFormat('en-EN', {
													style: 'currency',
													currency: 'USD',
												}).format(
													Math.min(...coin?.market_data?.sparkline_7d.price)
												)}{' '}
											</span>
										</p>
									) : null}
								</div>
								<div>
									<p className="text-md text-secondary">7d High</p>
									{coin?.market_data?.sparkline_7d?.price ? (
										<p className="text-md font-semibold">
											<span>
												{new Intl.NumberFormat('en-EN', {
													style: 'currency',
													currency: 'USD',
												}).format(
													Math.max(...coin?.market_data?.sparkline_7d.price)
												)}{' '}
											</span>
										</p>
									) : null}
								</div>
							</div>
						</div>
					</div>
					<div className=" py-3">
						<div className="flex items-center justify-between">
							<div className="flex flex-1 justify-between ">
								<div>
									<p className="text-md text-secondary">All-Time Low</p>
									{coin?.market_data?.atl ? (
										<div>
											<div>
												<span className="text-md font-semibold">
													${coin?.market_data?.atl?.usd.toLocaleString()}
												</span>
												<span
													className={
														coin?.market_data?.atl_change_percentage?.usd > 0
															? 'pl-2 text-green-500'
															: 'pl-2 text-red-500'
													}
												>
													{coin?.market_data?.atl_change_percentage?.usd.toFixed(
														2
													)}
													%
												</span>
											</div>
											<span className="text-right text-sm">
												{new Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}).format(new Date(coin?.market_data?.atl_date?.usd))}
											</span>
										</div>
									) : null}
								</div>
								<div>
									<p className="text-md text-center text-secondary">
										All-Time High
									</p>
									{coin?.market_data?.ath ? (
										<div>
											<div>
												<span className="text-md font-semibold">
													${coin?.market_data?.ath?.usd.toLocaleString()}
												</span>
												<span
													className={
														coin?.market_data?.ath_change_percentage?.usd > 0
															? 'pl-2 text-green-500'
															: 'pl-2 text-red-500'
													}
												>
													{coin?.market_data?.ath_change_percentage?.usd.toFixed(
														2
													)}
													%
												</span>
											</div>
											<span className="text-right text-sm">
												{new Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}).format(new Date(coin?.market_data?.ath_date?.usd))}
											</span>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h2 className="p-2 text-2xl">What is {coin?.name}?</h2>
			<p
				className="text-md p-2 leading-6 "
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(
						coin?.description ? coin?.description?.en : null
					),
				}}
			></p>
		</div>
	);
};
export default Crypto;
