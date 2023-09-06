const Label = ({ children, percentage }) => {
	return (
		<div className=" flex flex-1 flex-col items-center border border-table ">
			<p className="w-full border-table bg-accent py-2 text-center font-normal">
				{children}
			</p>
			{percentage ? (
				<p
					className={
						percentage > 0 ? 'py-2 text-green-500' : 'py-2 text-red-500'
					}
				>
					{percentage.toFixed(1)}%
				</p>
			) : null}
		</div>
	);
};
export default Label;
