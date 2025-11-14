import React from "react";
import { Eye, CheckCircle, X, Star, Package } from "lucide-react";

interface Product {
	name: string;
	featured?: boolean;
	seller: string;
	category: string;
	price: string;
	stock: number;
	sales: number;
	rating: number;
	status: "active" | "out-of-stock" | "pending";
}

const MarketplaceTable: React.FC<{ data: Product[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Product
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Seller
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Category
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Price
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Stock
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Sales
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]   tracking-wider">
							Rating
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
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
										<Package size={20} className="text-gray-400" />
									</div>
									<div className="flex flex-col gap-1">
										<div className="text-sm font-medium text-[#101828]">
											{product.name}
										</div>
										{product.featured && (
											<div className="flex items-center gap-1 border border-[#0000001a] w-fit px-2 py-1 rounded-lg">
												<Star
													size={12}
													className="text-[#F0B100] fill-[#F0B100]"
												/>
												<span className="text-xs text-[#0A0A0A]">Featured</span>
											</div>
										)}
									</div>
								</div>
							</td>

							{/* Seller */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#364153]">{product.seller}</span>
							</td>

							{/* Category */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#0A0A0A]  border border-[#0000001a] px-2 py-1 rounded-lg">
									{product.category}
								</span>
							</td>

							{/* Price */}
							<td className="px-4 py-4">
								<span className="text-sm font-medium text-[#101828]">
									{product.price}
								</span>
							</td>

							{/* Stock */}
							<td className="px-4 py-4">
								<span
									className={`text-sm font-medium ${
										product.stock === 0 ? "text-[#CA3500]" : "text-[#364153]"
									}`}
								>
									{product.stock}
								</span>
							</td>

							{/* Sales */}
							<td className="px-4 py-4">
								<span className="text-sm text-[#364153]">{product.sales}</span>
							</td>

							{/* Rating */}
							<td className="px-4 py-4">
								<div className="flex items-center gap-1">
									<Star size={14} className="text-[#F0B100] fill-[#F0B100]" />
									<span className="text-sm font-medium text-[#364153]">
										{product.rating}
									</span>
								</div>
							</td>

							{/* Status */}
							<td className="px-4 py-4">
								<span
									className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
										product.status === "active"
											? "bg-[#DCFCE7] text-[#008236] "
											: product.status === "out-of-stock"
											? "bg-[#FFEDD4] text-[#CA3500] "
											: "bg-[#ECEEF2] text-[#030213] "
									}`}
								>
									{product.status === "active" && "Active"}
									{product.status === "out-of-stock" && "Out of Stock"}
									{product.status === "pending" && "Pending"}
								</span>
							</td>

							{/* Actions */}
							<td className="px-4 py-4">
								<div className="flex items-center gap-2">
									<button className="cursor-pointer hover:bg-gray-100 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
										<Eye size={18} className="text-[#0A0A0A]" />
									</button>
									{product.status === "pending" && (
										<>
											<button className="cursor-pointer hover:bg-green-50 border  border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
												<CheckCircle size={18} className="text-green-600" />
											</button>
											<button className="cursor-pointer hover:bg-red-50 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors">
												<X size={18} className="text-red-600" />
											</button>
										</>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MarketplaceTable;
