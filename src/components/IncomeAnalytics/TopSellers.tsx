import { useGetAllTopSellerQuery } from "@/redux/features/IncomeAnalytics/IncomeAnalyticsApi";
import { TrendingUp } from "lucide-react";
import { formatValue } from "@/utils/formatValue";

interface Seller {
	sellerName: string;
	totalOrders: number;
	totalRevenue: number | string;
	totalCommission: number | string;
	orderIncreaseRate: number;
}

export function TopSellers() {
	const { data } = useGetAllTopSellerQuery(undefined);
	return (
		<div className="w-full bg-white rounded-lg border border-gray-200 p-6">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-900">Top Sellers</h2>
				<p className="text-sm text-gray-500">
					Highest performing sellers this month
				</p>
			</div>

			{/* Sellers List */}
			<div className="space-y-4">
				{data?.topSellers.map((seller: Seller, index: number) => (
					<div
						key={index}
						className="flex flex-col md:flex-row md:items-center justify-between py-4 px-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
					>
						{/* Left */}
						<div className="flex items-center gap-4 flex-1">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
								<span className="text-blue-600 font-semibold text-sm">
									#{index + 1}
								</span>
							</div>
							<div>
								<p className="font-medium text-gray-900">{seller.sellerName}</p>
								<p className="text-sm text-gray-600">
									{seller.totalOrders} orders
								</p>
							</div>
						</div>

						{/* Right */}
						<div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-12 mt-4 md:mt-0 w-full md:w-auto">
							{/* Revenue */}
							<div className="text-left md:text-right w-1/3 md:w-auto">
								<p className="text-xs text-gray-500 font-medium mb-1">
									Revenue
								</p>

								<p className="text-sm text-[#101828]">
									${formatValue(seller.totalRevenue)}
								</p>
							</div>

							{/* Commission */}
							<div className="text-left md:text-right w-1/3 md:w-auto">
								<p className="text-xs text-gray-500 font-medium mb-1">
									Commission
								</p>
								<p className="text-sm font-medium text-green-600">
									${formatValue(seller.totalCommission)}
								</p>
							</div>

							{/* Growth */}
							<div className="flex items-center gap-2 w-1/3 md:w-auto">
								<TrendingUp className="w-4 h-4 text-green-600" />
								<p className="text-sm font-medium text-green-600">
									{seller.orderIncreaseRate}%
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
