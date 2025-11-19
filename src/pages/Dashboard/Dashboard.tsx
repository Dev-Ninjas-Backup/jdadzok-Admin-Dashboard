import DashboardHeader from "@/components/common/DashboardHeader";
import StatCard from "@/components/common/DashboardStatCard";
import { ActivityDashboard } from "@/components/Dashboard/ActivityDashboard";
import RecentReports from "@/components/Dashboard/RecentReports";
import {
	useGetAllDashboardOverviewQuery,
	useGetAllRevenueTrendsQuery,
	useGetAllUserGrowthQuery,
} from "@/redux/features/dashboard/dashboardApi";

import {
	Users,
	Building2,
	Calendar,
	ShoppingBag,
	TrendingUp,
} from "lucide-react";

import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export default function DashboardOverview() {
	const { data } = useGetAllDashboardOverviewQuery(undefined);
	const { data: growth } = useGetAllUserGrowthQuery(undefined);
	const { data: revenue } = useGetAllRevenueTrendsQuery(undefined);

	const stats = [
		{
			label: "Total Users",
			value: `${data?.usersThisMonth}`,
			change: `+${data?.userIncreasePercent}% from last month`,
			icon: Users,
			iconColor: "text-blue-500",
			bgColor: "bg-blue-50",
		},
		{
			label: "Verified Communities",
			value: `${data?.totalCommunities}`,
			change: `+${data?.communitiesIncreasePercent} new this week`,
			icon: Building2,
			iconColor: "text-green-500",
			bgColor: "bg-green-50",
		},
		{
			label: "Active Events",
			value: `${data?.activeVolunteerProjectsCount}`,
			change: `${data?.volunteerProjectsIncreasePercent} happening today`,
			icon: Calendar,
			iconColor: "text-purple-500",
			bgColor: "bg-purple-50",
		},
		{
			label: "Marketplace Revenue",
			value: `$${data?.marketplacePromotionEarningsThisMonth}`,
			change: `+${data?.promoIncreasePercent}% from last month`,
			icon: ShoppingBag,
			iconColor: "text-orange-500",
			bgColor: "bg-orange-50",
		},
	];

	return (
		<main>
			{/* Header Section */}

			<div>
				<DashboardHeader
					title="Dashboard Overview"
					subtitle="Welcome back! Here's what's happening on your platform."
					buttonLabel="Download Report"
					onButtonClick={() => console.log("Download clicked")}
				/>
			</div>

			{/* Stats Grid */}
			<div className="py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard key={index} {...stat} />
					))}
				</div>
			</div>

			{/* Charts Section */}
			<div className="py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* User Growth Chart */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-start justify-between mb-6">
							<div>
								<h2 className="text-lg font-semibold text-gray-900">
									User Growth
								</h2>
								<p className="text-gray-600 text-sm mt-1">
									Monthly active users
								</p>
							</div>
							<TrendingUp className="text-green-500 w-5 h-5" />
						</div>
						<ResponsiveContainer
							width="100%"
							height={300}
							className="[&_*]:outline-none [&_*:focus]:outline-none"
						>
							<LineChart data={growth?.userGrowth}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis
									dataKey="month"
									stroke="#9ca3af"
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<YAxis stroke="#9ca3af" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#ffffff",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
									}}
								/>
								<Line
									type="monotone"
									dataKey="count"
									stroke="#3b82f6"
									dot={{ fill: "#3b82f6", r: 4 }}
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>

					{/* Revenue Trends Chart */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-start justify-between mb-6">
							<div>
								<h2 className="text-lg font-semibold text-gray-900">
									Revenue Trends
								</h2>
								<p className="text-gray-600 text-sm mt-1">
									Monthly revenue in USD
								</p>
							</div>
						</div>
						<ResponsiveContainer
							width="100%"
							height={300}
							className="[&_*]:outline-none [&_*:focus]:outline-none"
						>
							<BarChart data={revenue?.revenueTrends}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis
									dataKey="month"
									stroke="#9ca3af"
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<YAxis stroke="#9ca3af" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#ffffff",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
									}}
								/>
								<Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="space-y-8 py-8">
				<ActivityDashboard />
				<RecentReports />
			</div>
		</main>
	);
}
