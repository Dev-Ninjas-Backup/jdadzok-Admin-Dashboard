import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import FilterBar from "@/components/Order/FilterBar";
import OrderTable from "@/components/Order/OrderTable";
import { Box, Clock, DollarSign, DownloadIcon, TrendingUp } from "lucide-react";

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

const stats = [
	{
		title: "Total Orders",
		value: "5",
		leftIconColor: "#155DFC",
		leftIcon: <Box size={32} />,
		subtitle: "+12% this month",
		subtitleColor: "#00A63E",
	},
	{
		title: "Total Revenue",
		value: "$143.46",
		subtitle: "+12% this month",
		subtitleColor: "#00A63E",
		leftIconColor: "#00A63E", // Blue color
		leftIcon: <DollarSign size={32} />,
	},
	{
		title: "Platform Commission",
		value: "$14.35",

		leftIconColor: "#9810FA", // Green color
		leftIcon: <TrendingUp size={32} />,
		subtitle: "10% avg rate",
		subtitleColor: "#4A5565",
	},
	{
		title: "Completed",
		value: "2",

		leftIconColor: "#F54900", // Orange color
		leftIcon: <Clock size={32} />,
		subtitle: "33% completion rate",
		subtitleColor: "#4A5565",
	},
];

const sampleOrders: Order[] = [
	{
		orderId: "ORD-10234",
		customer: "John Davis",
		product: "Eco-Friendly Water Bottle",
		seller: "Green Store",
		amount: "$24.99",
		commission: "$2.5",
		date: "2024-06-15",
		status: "completed",
	},
	{
		orderId: "ORD-10235",
		customer: "Sarah Miller",
		product: "Bamboo Toothbrush Set",
		seller: "EcoEssentials",
		amount: "$12.99",
		commission: "$1.3",
		date: "2024-06-15",
		status: "processing",
	},
	{
		orderId: "ORD-10236",
		customer: "Mike Johnson",
		product: "Organic Cotton Tote Bag",
		seller: "Sustainable Fashion",
		amount: "$18.5",
		commission: "$1.85",
		date: "2024-06-14",
		status: "completed",
	},
	{
		orderId: "ORD-10237",
		customer: "Emily Chen",
		product: "Solar-Powered Charger",
		seller: "Tech4Good",
		amount: "$45",
		commission: "$4.5",
		date: "2024-06-14",
		status: "shipped",
	},
	{
		orderId: "ORD-10238",
		customer: "Robert Taylor",
		product: "Reusable Food Wraps",
		seller: "Kitchen Eco",
		amount: "$16.99",
		commission: "$1.7",
		date: "2024-06-13",
		status: "pending",
	},
	{
		orderId: "ORD-10239",
		customer: "Lisa Anderson",
		product: "Eco-Friendly Water Bottle",
		seller: "Green Store",
		amount: "$24.99",
		commission: "$2.5",
		date: "2024-06-12",
		status: "refunded",
	},
];

export default function OrdersTransactions() {
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Orders & Transactions
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Track all marketplace orders and payments
					</p>
				</div>
				<button className="flex items-center text-sm sm:text-base justify-center gap-0.5 sm:gap-2 w-auto cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					<DownloadIcon size={16} />
					Export Report
				</button>
			</div>
			<div className="grid min-[480px]:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<CardWithoutIcon
						key={index}
						title={stat.title}
						value={stat.value}
						rightIcon={stat.leftIcon}
						rightIconColor={stat.leftIconColor}
						subtitle={stat.subtitle}
						subtitleColor={stat.subtitleColor}
						gapX={32}
						gap={8}
					/>
				))}
			</div>
			<div className="border border-[#0000001a] rounded-xl overflow-hidden">
				<FilterBar
					searchPlaceholder="Search by order ID or customer..."
					onSearchChange={(value: string) => console.log("Search:", value)}
					onStatusChange={(value: string) => console.log("Status:", value)}
					onMoreFiltersClick={() => console.log("More filters clicked")}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<OrderTable data={sampleOrders} />
			</div>
		</div>
	);
}
