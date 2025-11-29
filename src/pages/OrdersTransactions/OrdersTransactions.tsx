import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import FilterBar from "@/components/Order/FilterBar";
import OrderTable from "@/components/Order/OrderTable";
import { useTransaction } from "@/redux/features/transaction/hooks/useTransaction";
import { useGetAllTransactionOverviewQuery } from "@/redux/features/transaction/transactionApi";
import { Box, Clock, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function OrdersTransactions() {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("All Status");
	const { data } = useGetAllTransactionOverviewQuery(undefined);

	const filters = {
		search: search || undefined, // include only if not empty
		...(status !== "All Status" && { status }),
	};
	const { transaction, page, setPage, totalPages } = useTransaction(filters);
	const handlePrev = () => setPage(Math.max(1, page - 1));
	const handleNext = () => setPage(Math.min(totalPages, page + 1));
	console.log(transaction);
	const stats = [
		{
			title: "Total Orders",
			value: `${data?.totalOrders}`,
			leftIconColor: "#155DFC",
			leftIcon: <Box size={32} />,
			subtitle: `+${data?.orderIncreaseRate}% this month`,
			subtitleColor: "#00A63E",
		},
		{
			title: "Total Revenue",
			value: `$${data?.totalRevenue}`,
			subtitle: `+${data?.revenueIncreaseRate}% this month`,
			subtitleColor: "#00A63E",
			leftIconColor: "#00A63E", // Blue color
			leftIcon: <DollarSign size={32} />,
		},
		{
			title: "Platform Commission",
			value: `${data?.commission}`,

			leftIconColor: "#9810FA", // Green color
			leftIcon: <TrendingUp size={32} />,
			subtitle: `${data?.commissionIncreaseRate}% avg rate`,
			subtitleColor: "#4A5565",
		},

		{
			title: "Completed",
			value: `${data?.completedOrders}`,

			leftIconColor: "#F54900", // Orange color
			leftIcon: <Clock size={32} />,
			subtitle: `${data?.completionRate}% completion rate`,
			subtitleColor: "#4A5565",
		},
	];

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
				{/* <button className="flex items-center text-sm sm:text-base justify-center gap-0.5 sm:gap-2 w-auto cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					<DownloadIcon size={16} />
					Export Report
				</button> */}
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
					onSearchChange={(value) => setSearch(value)}
					onStatusChange={(value) => setStatus(value)}
					onMoreFiltersClick={() => console.log("More filters clicked")}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<OrderTable data={transaction} />
			</div>
			{totalPages > 0 && (
				<div className="flex justify-end gap-2 mt-4">
					<button
						onClick={handlePrev}
						disabled={page === 1}
						className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
					>
						Prev
					</button>
					<span className="px-4 py-2 bg-gray-100 rounded">
						Page {page} of {totalPages}
					</span>
					<button
						onClick={handleNext}
						disabled={page === totalPages}
						className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
