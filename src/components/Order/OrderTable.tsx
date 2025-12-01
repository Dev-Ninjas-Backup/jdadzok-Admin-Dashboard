import React from "react";
import { formatValue } from "@/utils/formatValue";

interface Order {
	id: string;

	buyer: {
		profile: {
			name: string;
		};
	};

	product: {
		title: string;
		seller?: {
			profile?: {
				name: string;
			};
		};
		promotionFee?: number | string;
	};

	totalPrice?: string | number;

	amount?: string;
	commission?: string;

	createdAt: string;

	status:
		| "PENDING"
		| "PAID"
		| "SHIPPED"
		| "DELIVERED"
		| "CANCELLED"
		| "REFUNDED";
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
						{/* <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Actions
						</th> */}
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
								<div className="text-sm font-medium text-[#101828] whitespace-nowrap">
									{product.id}
								</div>
							</td>

							{/* Seller */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#364153] whitespace-nowrap">
									{product?.buyer?.profile?.name}
								</span>
							</td>

							{/* Category */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#0A0A0A] whitespace-nowrap">
									{product?.product.title}
								</span>
							</td>

							{/* Price */}
							<td className="px-4 py-4">
								<span className="text-sm font-medium text-[#101828] whitespace-nowrap">
									{product.product?.seller?.profile?.name}
								</span>
							</td>

							{/* Stock */}
							<td className="px-4 py-4">
								<span className={`text-sm font-medium whitespace-nowrap`}>
									{product?.totalPrice}
								</span>
							</td>

							{/* Sales */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#00A63E]">
									{formatValue(product?.product?.promotionFee ?? 0)}
								</span>
							</td>

							{/* Rating */}
							<td className="px-4 py-4">
								<span className="text-sm font-medium text-[#364153] whitespace-nowrap">
									{product.createdAt}
								</span>
							</td>

							{/* Status */}
							<td className="px-4 py-4">
								<span
									className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
										product.status === "PENDING"
											? "bg-[#FFEDD4] text-[#CA3500]"
											: product.status === "PAID"
											? "bg-[#DBEAFE] text-[#1447E6]"
											: product.status === "SHIPPED"
											? "bg-[#F3E8FF] text-[#8200DB]"
											: product.status === "DELIVERED"
											? "bg-[#DCFCE7] text-[#008236]"
											: product.status === "CANCELLED"
											? "bg-[#FEE2E2] text-[#B91C1C]"
											: product.status === "REFUNDED"
											? "bg-[#ECEEF2] text-[#030213]"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{product.status === "PENDING" && "Pending"}
									{product.status === "PAID" && "Paid"}
									{product.status === "SHIPPED" && "Shipped"}
									{product.status === "DELIVERED" && "Delivered"}
									{product.status === "CANCELLED" && "Cancelled"}
									{product.status === "REFUNDED" && "Refunded"}
								</span>
							</td>

							{/* Actions */}
							{/* <td className="px-4 py-4">
								<div className="flex items-center gap-2">
									<button className="whitespace-nowrap text-[#0A0A0A] cursor-pointer hover:bg-gray-100 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
										View Details
									</button>
								</div>
							</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
