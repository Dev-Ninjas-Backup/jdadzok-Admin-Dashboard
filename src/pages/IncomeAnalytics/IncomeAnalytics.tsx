import DashboardHeader from "@/components/common/DashboardHeader";
import StatCard from "@/components/common/DashboardStatCard";
import { IncomeCharts } from "@/components/IncomeAnalytics/IncomeChart";
import { TopSellers } from "@/components/IncomeAnalytics/TopSellers";
import { useGetAllIncomeAnalyticOverviewQuery } from "@/redux/features/IncomeAnalytics/IncomeAnalyticsApi";
import { ShoppingBag, DollarSign, TrendingUp, Wallet } from "lucide-react";

export default function IncomeAnalytics() {
	const { data } = useGetAllIncomeAnalyticOverviewQuery(undefined);

	const stats = [
		{
			label: "Total Revenue",
			value: `${data?.totalRevenue}`,
			change: `+${data?.revenueIncreasePercent}% from last month`,
			icon: DollarSign,
			iconColor: "#00A63E",
			bgColor: "#F9FAFB",
		},
		{
			label: "Platform Commission",
			value: `${data?.platformCommision}`,
			change: `+${data?.commisionIncreasePercent}% from last month`,
			icon: TrendingUp,
			iconColor: "#155DFC",
			bgColor: "#F9FAFB",
		},
		{
			label: "Seller Payouts",
			value: `${data?.sellerPayouts}`,
			change: `Pending: $${data?.pendingPayouts}`,
			icon: Wallet,
			iconColor: "#9810FA",
			bgColor: "#F9FAFB",
		},
		{
			label: "Avg. Order Value",
			value: `${data?.avgOrderValue}`,
			change: `+${data?.avgOrderIncreasePercent}% from last month`,
			icon: ShoppingBag,
			iconColor: "#F54900",
			bgColor: "#F9FAFB",
		},
	];
	return (
		<main>
			{/* Header Section */}

			<div>
				<DashboardHeader
					title="	Income & Analytics"
					subtitle="	Monitor revenue, commissions, and financial performance."
					// buttonLabel="Download Financial Report"
					// onButtonClick={() => console.log("Download clicked")}
				/>
			</div>

			<div className="py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard key={index} {...stat} />
					))}
				</div>
			</div>
			<div className="space-y-8">
				<IncomeCharts />
				<TopSellers />
			</div>
		</main>
	);
}
