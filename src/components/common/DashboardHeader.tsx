// components/DashboardHeader.jsx

const DashboardHeader = ({
	title,
	subtitle,
	buttonLabel,
	onButtonClick,
}: any) => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-auto">
			{/* Text Section */}
			<div className="space-y-1">
				<h1 className="text-lg sm:text-2xl  text-[#101828]">{title}</h1>
				<p className="text-[#4A5565] text-sm sm:text-base">{subtitle}</p>
			</div>

			{/* Button */}
			{buttonLabel && (
				<button
					onClick={onButtonClick}
					className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full sm:w-auto"
				>
					{buttonLabel}
				</button>
			)}
		</div>
	);
};

export default DashboardHeader;
