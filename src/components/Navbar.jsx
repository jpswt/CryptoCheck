import { Link, useNavigate } from 'react-router-dom';
import ToggleBtn from './ToggleBtn';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();
	const [toggleMenu, setToggleMenu] = useState(false);

	const handleToggleMenu = () => {
		setToggleMenu(!toggleMenu);
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			setToggleMenu(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleMenuClose = () => {
		setToggleMenu(false);
	};

	return (
		<div className=" flex h-[80px] w-full border-b-2 border-table shadow-sm">
			<div className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-secondary bg-primary px-2 font-bold ">
				<div>
					<Link to="/" className="flex items-center gap-2">
						<h1 className="text-2xl">CryptoCheck</h1>
						<IoShieldCheckmarkOutline className="text-3xl font-extrabold text-accent" />
					</Link>
				</div>
				<div className="hidden md:flex md:items-center">
					<Link to="/home" className="p-4 hover:text-accent">
						Home
					</Link>
					<Link to="/portfolio" className="p-4 hover:text-accent">
						{user?.email ? 'My Portfolio' : 'Portfolio'}
					</Link>
					{user?.email ? (
						<Link
							onClick={handleLogout}
							className="mx-2 rounded-lg bg-button px-5 py-1 text-buttonText hover:brightness-110 "
						>
							Logout
						</Link>
					) : (
						<>
							<Link to="/register" className="p-4 hover:text-accent">
								Register
							</Link>
							<Link
								onClick={handleMenuClose}
								to="/login"
								className="mx-2 rounded-lg bg-button px-5 py-1 text-buttonText hover:brightness-110 "
							>
								Login
							</Link>
						</>
					)}

					<div>
						<ToggleBtn />
					</div>
				</div>
				<div
					className="z-5 block cursor-pointer md:hidden"
					onClick={handleToggleMenu}
				>
					{toggleMenu ? (
						<AiOutlineClose size={25} />
					) : (
						<AiOutlineMenu size={25} />
					)}
				</div>

				{/* Mobile */}
				<div
					className={
						toggleMenu
							? 'fixed left-0 top-20 z-10 flex h-[90%] w-full flex-col items-center bg-primary duration-300 ease-in md:hidden'
							: 'fixed left-[-100%] top-20 flex h-[90%] flex-col items-center duration-300 ease-in '
					}
				>
					<div className="flex w-full justify-end">
						<ToggleBtn />
					</div>

					<ul className="w-full p-2 ">
						<li className="border-b px-2 py-6 ">
							<Link
								className="text-xl hover:text-accent"
								onClick={handleMenuClose}
								to="/home"
							>
								Home
							</Link>
						</li>
						<li className="border-b px-2 py-6">
							<Link
								className="text-xl hover:text-accent"
								onClick={handleMenuClose}
								to="/portfolio"
							>
								Portfolio
							</Link>
						</li>
						{/* <li className="py-6">
							<ToggleBtn />
						</li> */}
					</ul>
					<div className="flex w-full flex-col p-4">
						{user?.email ? (
							<Link
								onClick={handleLogout}
								to="/"
								className="my-2 w-full rounded-2xl border border-secondary bg-button p-3 text-center text-xl text-buttonText shadow-xl hover:brightness-110"
							>
								<button>Logout</button>
							</Link>
						) : (
							<>
								<Link
									onClick={handleMenuClose}
									to="/register"
									className="my-2 w-full rounded-2xl border border-secondary bg-button p-3 text-center text-xl text-buttonText shadow-xl hover:brightness-110"
								>
									<button>Register</button>
								</Link>
								<Link
									onClick={handleMenuClose}
									to="/login"
									className="my-2 w-full rounded-2xl border border-secondary bg-button p-3 text-center text-xl text-buttonText shadow-xl hover:brightness-110"
								>
									<button>Login</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
