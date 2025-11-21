import {
	useGetRevenueCategoryQuery,
	useGetRevenueGrowthQuery,
} from "@/redux/features/IncomeAnalytics/IncomeAnalyticsApi";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"];

export function IncomeCharts() {
	const { data: revenue } = useGetRevenueGrowthQuery(undefined);
	const { data } = useGetRevenueCategoryQuery(undefined);

	const categoryData = [
		{
			name: "Marketplace",
			value: data?.volunteerProjects,
			// amount: 24210,
		},
		{
			name: "Events",
			value: data?.marketplacePromotions,
			// amount: 16140
		},
		{
			name: "Donations",
			value: data?.donations,
			// amount: 8070,
		},
	];

	return (
		<div className="w-full space-y-6">
			{/* Top Row: Revenue Growth and Revenue by Category */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
				{/* Revenue Growth Chart */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<div className="mb-6">
						<h3 className="text-base  text-[#101828]">Revenue Growth</h3>
						<p className="text-sm text-[#4A5565] pt-1.5">
							Monthly revenue and commission trends
						</p>
					</div>
					<div className="w-full h-80 [&_*]:outline-none [&_*:focus]:outline-none">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={revenue?.revenueTrends}
								margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#e5e7eb"
									vertical={false}
								/>
								<XAxis
									dataKey="month"
									stroke="#6b7280"
									style={{ fontSize: "12px" }}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
								<Tooltip
									contentStyle={{
										backgroundColor: "#ffffff",
										border: "1px solid #e5e7eb",
										borderRadius: "6px",
									}}
								/>
								<Line
									type="monotone"
									dataKey="total"
									stroke="#3b82f6"
									strokeWidth={2}
									dot={{ fill: "#3b82f6", r: 4 }}
									activeDot={{ r: 5 }}
								/>
								{/* <Line
									type="monotone"
									dataKey="commission"
									stroke="#10b981"
									strokeWidth={2}
									dot={{ fill: "#10b981", r: 4 }}
									activeDot={{ r: 5 }}
								/> */}
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Revenue by Category - Donut Chart */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<div className="mb-6">
						<h3 className="text-base font-semibold text-gray-900">
							Revenue by Category
						</h3>
						<p className="text-sm text-gray-500">
							Distribution across revenue sources
						</p>
					</div>

					<div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
						{/* Pie Chart */}
						<div className="w-full lg:flex-1 h-64 flex items-center justify-center [&_*]:outline-none [&_*:focus]:outline-none">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={categoryData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
										dataKey="value"
									>
										{categoryData.map((_, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index]} />
										))}
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>

						{/* Legend */}
						<div className="w-full lg:flex-1 space-y-4 lg:ml-4">
							{categoryData.map((category, index) => (
								<div
									key={category.name}
									className="flex items-start justify-between"
								>
									<div className="flex items-center gap-3">
										<div
											className="w-3 h-3 rounded-full shrink-0"
											style={{ backgroundColor: COLORS[index] }}
										/>
										<div>
											<p className="text-sm font-medium text-gray-900">
												{category.name}
											</p>
											{/* <p className="text-xs text-gray-500">
												${(category.amount / 1000).toFixed(0)}k
											</p> */}
										</div>
									</div>
									<p className="text-sm font-medium text-gray-900 ml-2">
										{category.value}%
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Row: Monthly Performance */}
			<div className="relative">
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<div className="absolute top-6 right-6">
						{/* <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
							View Full Report
						</button> */}
					</div>
					<div className="mb-6">
						<h3 className="text-base font-semibold text-gray-900">
							Monthly Performance
						</h3>
						<p className="text-sm text-gray-500">Revenue comparison by month</p>
					</div>
					<div className="w-full h-80 [&_*]:outline-none [&_*:focus]:outline-none">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={revenue?.revenueTrends}
								margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#e5e7eb"
									vertical={false}
								/>
								<XAxis
									dataKey="month"
									stroke="#6b7280"
									style={{ fontSize: "12px" }}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
								<Tooltip
									contentStyle={{
										backgroundColor: "#ffffff",
										border: "1px solid #e5e7eb",
										borderRadius: "6px",
									}}
								/>
								<Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
								{/* <Bar
									dataKey="commission"
									fill="#10b981"
									radius={[4, 4, 0, 0]}
								/> */}
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
}
