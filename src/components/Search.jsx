const Search = ({ setSearch }) => {
	return (
		<div className=" flex flex-col justify-end pb-6 pt-4 text-center md:flex-row md:text-right">
			{/* <h1 className=" my-2 text-2xl font-bold">Search</h1> */}
			<form>
				<input
					onChange={(e) => setSearch(e.target.value)}
					className="w-full rounded-lg border border-input bg-primary px-4 py-2 text-primary shadow-md"
					type="text"
					placeholder="Search crypto..."
				/>
			</form>
		</div>
	);
};
export default Search;
