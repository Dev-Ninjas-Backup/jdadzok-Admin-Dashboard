import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import MarketplaceTable from "@/components/Markeplace/MarketplaceTable";
import { useMarketplace } from "@/redux/features/marketplace/hooks/useMarketplace";
import { useGetAllMarketplaceOverviewQuery } from "@/redux/features/marketplace/marketplaceApi";
import { Box, CheckCircle, DollarSign, StarIcon } from "lucide-react";
import { useState } from "react";

export default function Marketplace() {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const { data } = useGetAllMarketplaceOverviewQuery(undefined);

	const filters = {
		search: search || undefined,
		...(status !== "all" && { status }),
	};

	const { market, page, setPage, totalPages } = useMarketplace(filters);

	const handlePrev = () => setPage(Math.max(1, page - 1));
	const handleNext = () => setPage(Math.min(totalPages, page + 1));

	const stats = [
		{
			title: "Total Products",
			value: `${data?.totalProducts}`,
			subtitle: undefined,
			leftIconColor: "#155DFC",
			leftIcon: <Box size={20} />,
		},
		{
			title: "Active Listings",
			value: `${data?.activeListings}`,
			subtitle: "Ready to start" as string | undefined,
			leftIconColor: "#00A63E", // Blue color
			leftIcon: <CheckCircle size={20} />,
		},
		{
			title: "Featured Items",
			value: `${data?.featuredItems}`,
			subtitle: "In progress" as string | undefined,
			leftIconColor: "#D08700", // Green color
			leftIcon: <StarIcon size={20} />,
		},
		{
			title: "Total Sales",
			value: `${data?.totalSales}`,
			subtitle: "Awaiting review" as string | undefined,
			leftIconColor: "#00A63E", // Orange color
			leftIcon: <DollarSign size={20} />,
		},
	];

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const filterOption = [
		{ id: "all", label: "All Products" },
		{ id: "CONTINUED", label: "Active" },
		{ id: "SOLDOUT", label: "Sold Out" },
	];

	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Marketplace Management
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Manage products, sellers, and marketplace activities
					</p>
				</div>
				{/* <button className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					Add Product
				</button> */}
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<CardWithoutIcon
						key={index}
						title={stat.title}
						value={stat.value}
						leftIcon={stat.leftIcon}
						leftIconColor={stat.leftIconColor}
						gapX={12}
						gap={4}
					/>
				))}
			</div>
			<div className="border border-[#0000001a] rounded-xl overflow-hidden bg-white p-4">
				<SearchBar
					placeholder="Search events by title or community..."
					value={search}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="flex flex-wrap sm:flex-nowrap rounded-2xl gap-2 bg-[#ECECF0] sm:rounded-full p-1 w-full sm:w-fit">
				{filterOption.map((filter) => (
					<button
						key={filter.id}
						onClick={() => setStatus(filter.id)}
						className={`
				cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all
				w-[48%] sm:w-auto 
        ${
					status === filter.id
						? "bg-white text-[#0A0A0A] shadow-sm"
						: "text-gray-600 hover:text-gray-900"
				}`}
					>
						{filter.label}
					</button>
				))}
			</div>
			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<MarketplaceTable data={market} />
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
