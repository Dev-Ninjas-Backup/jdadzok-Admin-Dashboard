import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import PayoutManagementTable from "@/components/PayoutManagement/PayoutManagementTable";
import { Clock, DollarSign } from "lucide-react";
import { useState } from "react";

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

const stats = [
	{
		title: "Pending Payouts",
		value: "$1430",
		leftIconColor: "#F54900",
		leftIcon: <Clock size={32} />,
		subtitle: "2 requests",
		subtitleColor: "#F54900",
	},
	{
		title: "Processing",
		value: "1",

		leftIconColor: "#155DFC", // Orange color
		leftIcon: <DollarSign size={32} />,
		subtitle: "In progress",
		subtitleColor: "#4A5565",
	},
	{
		title: "Completed This Month",
		value: "$980.46",
		subtitle: "1 payouts",
		subtitleColor: "#00A63E",
		leftIconColor: "#00A63E", // Blue color
		leftIcon: <DollarSign size={32} />,
	},
	{
		title: "Total This Month",
		value: "$104.35",
		leftIconColor: "#9810FA", // Green color
		leftIcon: <DollarSign size={32} />,
	},
];

const sampleTransactions: Transaction[] = [
	{
		id: "1",
		name: "Green Store",
		type: "Seller",
		avatar: "G",
		amount: "$2450.00",
		date: "2024-06-15",
		paymentMethod: "Bank Transfer",
		accountInfo: "****5678",
		totalEarned: "$2695.50",
	},
	{
		id: "2",
		name: "Ocean Warriors NGO",
		type: "NGO",
		avatar: "O",
		amount: "$1850.00",
		date: "2024-06-14",
		paymentMethod: "PayPal",
		accountInfo: "ocean@ngo.org",
		totalEarned: "$2120.00",
	},
];

export default function PayoutManagement() {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const [activeFilter, setActiveFilter] = useState("pending");

	const filters = [
		{ id: "pending", label: "Pending Review", count: 1 },
		{ id: "processing", label: "Processing", count: 3 },
		{ id: "completed", label: "Completed", count: 2 },
		{ id: "all", label: "All Requests", count: null },
	];
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Payout Management
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Review and process seller withdrawal requests
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
			<div className="border border-[#0000001a] rounded-xl overflow-hidden bg-white p-4">
				<SearchBar
					placeholder="Search by seller name or account..."
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>
			{/* <div className=" flex sm:flex-row flex-col rounded-2xl items-center gap-2 bg-[#ECECF0] sm:rounded-full p-1 w-fit">
				{filters.map((filter) => (
					<button
						key={filter.id}
						onClick={() => setActiveFilter(filter.id)}
						className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
							activeFilter === filter.id
								? "bg-white text-[#0A0A0A] shadow-sm"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						{filter.label}
						{filter.count !== null && (
							<span className="ml-2 text-xs">{filter.count}</span>
						)}
					</button>
				))}
			</div> */}
			<div className="flex flex-wrap sm:flex-nowrap rounded-2xl gap-2 bg-[#ECECF0] sm:rounded-full p-1 w-full sm:w-fit">
				{filters.map((filter) => (
					<button
						key={filter.id}
						onClick={() => setActiveFilter(filter.id)}
						className={`
				cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all
				w-[48%] sm:w-auto       /* 👉 2 items per row below sm */
        ${
					activeFilter === filter.id
						? "bg-white text-[#0A0A0A] shadow-sm"
						: "text-gray-600 hover:text-gray-900"
				}`}
					>
						{filter.label}
						{filter.count !== null && (
							<span className="ml-2 text-xs">{filter.count}</span>
						)}
					</button>
				))}
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<PayoutManagementTable data={sampleTransactions} />
			</div>
		</div>
	);
}
