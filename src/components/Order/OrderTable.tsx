import React from "react";

interface Order {
	orderId: string;
	customer: string;
	product: string;
	seller: string;
	amount: string;
	commission: string;
	date: string;
	status: "completed" | "processing" | "shipped" | "pending" | "refunded";
}

const OrderTable: React.FC<{ data: Order[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Order Id
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Customer
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Product
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Seller
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Amount
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Commission
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Date
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Status
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{data.map((product, index) => (
						<tr
							key={index}
							className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
						>
							{/* Product */}
							<td className="px-4 py-4">
								<div className="text-sm font-medium text-[#101828]">
									{product.orderId}
								</div>
							</td>

							{/* Seller */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#364153]">
									{product.customer}
								</span>
							</td>

							{/* Category */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#0A0A0A] ">
									{product.product}
								</span>
							</td>

							{/* Price */}
							<td className="px-4 py-4">
								<span className="text-sm font-medium text-[#101828]">
									{product.seller}
								</span>
							</td>

							{/* Stock */}
							<td className="px-4 py-4">
								<span className={`text-sm font-medium`}>{product.amount}</span>
							</td>

							{/* Sales */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#00A63E]">
									{product.commission}
								</span>
							</td>

							{/* Rating */}
							<td className="px-4 py-4">
								<span className="text-sm font-medium text-[#364153]">
									{product.date}
								</span>
							</td>

							{/* Status */}
							<td className="px-4 py-4">
								<span
									className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
										product.status === "completed"
											? "bg-[#DCFCE7] text-[#008236]"
											: product.status === "processing"
											? "bg-[#DBEAFE] text-[#1447E6]"
											: product.status === "shipped"
											? "bg-[#F3E8FF] text-[#8200DB]"
											: product.status === "pending"
											? "bg-[#FFEDD4] text-[#CA3500]"
											: "bg-[#ECEEF2] text-[#030213]"
									}`}
								>
									{product.status === "completed" && "Completed"}
									{product.status === "processing" && "Processing"}
									{product.status === "shipped" && "Shipped"}
									{product.status === "pending" && "Pending"}
									{product.status === "refunded" && "Refunded"}
								</span>
							</td>

							{/* Actions */}
							<td className="px-4 py-4">
								<div className="flex items-center gap-2">
									<button className="text-[#0A0A0A] cursor-pointer hover:bg-gray-100 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
										View Details
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
