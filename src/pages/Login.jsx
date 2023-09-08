import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login(email, password);
			setEmail('');
			setPassword('');
			navigate('/portfolio');
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<div className="hero min-h-[calc(100vh-160px)] bg-primary">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold text-accent">Login</h1>
					<p className="py-6"></p>
				</div>
				<div className="card w-full min-w-[26rem] max-w-[36rem]  bg-accent shadow-2xl lg:flex-shrink-0">
					<form onSubmit={handleSubmit} className="card-body ">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-primary">Email</span>
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								placeholder="Email"
								className="input input-bordered bg-primary"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-primary">Password</span>
							</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								type="text"
								placeholder="password"
								className="input input-bordered bg-primary"
							/>
						</div>
						<div className="form-control mt-6">
							<button
								type="submit"
								className="btn btn-primary border-0 bg-button text-buttonText hover:bg-button hover:opacity-80"
							>
								Login
							</button>
						</div>
						<p className="mt-2 text-center">
							Don't have an account?{' '}
							<Link to="/register" className="font-bold text-accent">
								Register
							</Link>
						</p>
					</form>
					{error ? <p className="text-red-500">{error}</p> : null}
				</div>
			</div>
		</div>

		// <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center ">
		// 	<div className="min-w-[400px]">
		// 		<h1 className="mb-4 text-2xl font-bold">Login</h1>
		// 		<form action="">
		// 			<div>
		// 				<div>
		// 					<input
		// 						className="w-full border-b-2 border-table bg-primary p-2 py-2 outline-accent"
		// 						type="email"
		// 						placeholder="Email"
		// 					/>
		// 				</div>
		// 			</div>
		// 			<div className="mt-4">
		// 				<div>
		// 					<input
		// 						className="w-full border-b-2 border-table bg-primary p-2 py-2 outline-accent"
		// 						type="password"
		// 						placeholder="Password"
		// 					/>
		// 				</div>
		// 			</div>
		// 			<button className="mb-2 mt-6 w-full rounded-md bg-button py-2 font-bold text-buttonText">
		// 				Login
		// 			</button>
		// 			<p className="text-center">
		// 				Don't have an account?{' '}
		// 				<Link to="/register" className="font-bold text-accent">
		// 					Register
		// 				</Link>
		// 			</p>
		// 		</form>
		// 	</div>
		// </div>
	);
};
export default Login;
