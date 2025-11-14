import React from "react";

interface Transaction {
	id: string;
	name: string;
	type: "Seller" | "NGO";
	avatar: string; // Letter for avatar (G, O, etc.)
	amount: string;
	date: string;
	paymentMethod: "Bank Transfer" | "PayPal";
	accountInfo: string; // Last 4 digits or email
	totalEarned: string;
}

const PayoutManagementTable: React.FC<{ data: Transaction[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<div className="bg-white p-6 space-y-4">
				{data.map((product, index) => (
					<div
						key={index}
						className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 transition-colors rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between"
					>
						{/* Product */}
						<div className="px-6 py-4">
							<div className="flex gap-3">
								<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-[#0A0A0A]">
									G
								</div>

								<div className="space-y-1">
									{/* Row 1 */}
									<div className="flex flex-row gap-2">
										<div className="text-sm  sm:text-base font-normal text-[#101828]">
											{product.name}
										</div>
										<div className="text-[10px]  sm:text-xs font-normal rounded-xl flex items-center justify-center sm:rounded-full border border-[#0000001a] px-1  sm:px-2 sm:py-0.5 text-[#0A0A0A]">
											{product.type}
										</div>
									</div>

									{/* Row 2 — stacks on mobile, row on desktop */}
									<div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
										<div className="text-[10px]  sm:text-sm text-[#101828] font-normal">
											{product.amount}
										</div>
										<div className="text-[10px]  sm:text-sm text-[#4A5565] font-normal">
											{product.date}
										</div>
										<div className="text-[10px]  sm:text-sm text-[#4A5565] font-normal">
											{product.paymentMethod}
										</div>
									</div>

									{/* Row 3 */}
									<div className="text-[10px]  sm:text-sm text-[#101828] font-normal">
										Total earned: {product.totalEarned}
									</div>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="px-4 py-4 sm:flex sm:items-center sm:justify-end">
							<div className="flex items-center gap-2">
								<button className="text-[#0A0A0A] sm:text-base text-xs cursor-pointer hover:bg-gray-100 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
									View Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PayoutManagementTable;
