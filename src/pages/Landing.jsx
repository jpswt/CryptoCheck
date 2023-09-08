import { IoArrowUpCircle, IoArrowForwardCircle } from 'react-icons/io5';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';
import bcDark from '../assets/images/bc-landing-dark.svg';
import bcLight from '../assets/images/bc-landing-light.svg';
import { useNavigate } from 'react-router-dom';

const Landing = ({ crypto }) => {
	const { theme } = useContext(ThemeContext);
	const trending = crypto?.slice(0, 4);

	const navigate = useNavigate();
	// console.log(trending);
	return (
		<div>
			<div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] flex-col items-center  p-2">
				<div className="flex min-h-[40vh] w-full flex-col  items-center justify-between md:flex-row">
					<div>
						{theme === 'light' ? (
							<img
								className="w-[600px] md:w-[700px]"
								src={bcLight}
								alt="laptop with bitcoin logo on it"
							/>
						) : (
							<img
								className="w-[600px] md:w-[700px]"
								src={bcDark}
								alt="laptop with bitcoin logo on it"
							/>
						)}
					</div>
					<div className="flex flex-col items-center md:mt-8">
						<h1 className="text-center text-3xl font-bold sm:text-3xl md:text-3xl lg:text-4xl">
							Create & Track Your Crypto Portfolio Here
						</h1>
						<h2 className="text-md mt-6 max-w-[400px] text-center leading-normal sm:text-xl md:text-lg lg:max-w-[420px] lg:text-xl  ">
							At CryptoCheck, you can build a portfolio and track the current
							market changes.
						</h2>
						<button
							onClick={() => navigate('/register')}
							className="mt-8 rounded-md bg-button px-8 py-3 font-bold text-buttonText shadow-md hover:brightness-110"
						>
							Get Started
						</button>
					</div>
				</div>
				<div className="hidden px-2 md:flex md:w-full md:flex-col">
					<h2 className="mb-4 mt-8 px-2 text-center text-3xl font-bold">
						Market Trends
					</h2>
					<div className="grid-cols-1 gap-8 sm:grid-cols-2 md:grid  lg:grid-cols-4 ">
						{trending.map((coin) => (
							<div
								className="flex flex-col items-center rounded-lg border border-secondary bg-accent p-2 shadow-md shadow-primary"
								key={coin.id}
							>
								<div className="my-2 flex w-full items-center justify-evenly">
									<div className=" flex w-full items-center gap-2 ">
										<img
											src={coin.image}
											alt={coin.name}
											className="h-[40px] w-[40px]"
										/>
										<p>{coin.symbol.toUpperCase()}</p>
										<p className="rounded-md bg-primary px-2 py-1 text-sm shadow-sm shadow-primary  ">
											{coin.name}
										</p>
									</div>
									<div>
										{coin.price_change_percentage_24h > 0 ? (
											<IoArrowUpCircle className=" rotate-45 text-2xl opacity-70" />
										) : (
											<IoArrowForwardCircle className=" rotate-45 text-2xl opacity-70" />
										)}
									</div>
								</div>
								<div className="mt-8 flex w-full items-center justify-evenly">
									<div className=" flex w-full flex-col gap-1 ">
										<p className="text-xl">
											{new Intl.NumberFormat('en-EN', {
												style: 'currency',
												currency: 'USD',
											}).format(coin.current_price)}
										</p>
										<p className="opacity-70">
											{coin.price_change_percentage_24h.toFixed(2)}%
										</p>
									</div>

									<Sparklines data={coin.sparkline_in_7d.price}>
										<SparklinesLine
											color={
												coin.price_change_percentage_24h < 0
													? '#ef4444'
													: '#22c55e'
											}
											style={{ fill: 'none', strokeWidth: '2' }}
										/>
									</Sparklines>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Landing;
