import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import MarketplaceTable from "@/components/Markeplace/MarketplaceTable";
import { Box, CheckCircle, DollarSign, StarIcon } from "lucide-react";
import { useState } from "react";

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

const stats = [
	{
		title: "Total Products",
		value: "5",
		subtitle: undefined,
		leftIconColor: "#155DFC",
		leftIcon: <Box size={20} />,
	},
	{
		title: "Active Listings",
		value: "3",
		subtitle: "Ready to start" as string | undefined,
		leftIconColor: "#00A63E", // Blue color
		leftIcon: <CheckCircle size={20} />,
	},
	{
		title: "Featured Items",
		value: "2",
		subtitle: "In progress" as string | undefined,
		leftIconColor: "#D08700", // Green color
		leftIcon: <StarIcon size={20} />,
	},
	{
		title: "Total Sales",
		value: "2,283",
		subtitle: "Awaiting review" as string | undefined,
		leftIconColor: "#00A63E", // Orange color
		leftIcon: <DollarSign size={20} />,
	},
];

const sampleProducts: Product[] = [
	{
		name: "Eco-Friendly Water Bottle",
		featured: true,
		seller: "Green Store",
		category: "Sustainable Living",
		price: "$24.99",
		stock: 150,
		sales: 245,
		rating: 4.8,
		status: "active",
	},
	{
		name: "Bamboo Toothbrush Set",
		seller: "EcoEssentials",
		category: "Personal Care",
		price: "$12.99",
		stock: 89,
		sales: 567,
		rating: 4.6,
		status: "active",
	},
	{
		name: "Organic Cotton Tote Bag",
		featured: true,
		seller: "Sustainable Fashion",
		category: "Accessories",
		price: "$18.5",
		stock: 200,
		sales: 892,
		rating: 4.9,
		status: "active",
	},
	{
		name: "Solar-Powered Phone Charger",
		seller: "TechGood",
		category: "Electronics",
		price: "$45",
		stock: 0,
		sales: 156,
		rating: 4.3,
		status: "out-of-stock",
	},
	{
		name: "Reusable Food Wraps",
		seller: "Kitchen Eco",
		category: "Kitchen",
		price: "$16.99",
		stock: 120,
		sales: 423,
		rating: 4.7,
		status: "pending",
	},
];

export default function Marketplace() {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const [activeFilter, setActiveFilter] = useState("all");

	const filters = [
		{ id: "all", label: "All Products", count: null },
		{ id: "active", label: "Active", count: 3 },
		{ id: "pending", label: "Pending Review", count: 1 },
		{ id: "featured", label: "Featured", count: 2 },
	];

	const filteredProducts = sampleProducts.filter((product) => {
		let matchesFilter = true;
		if (activeFilter === "active") {
			matchesFilter = product.status === "active";
		} else if (activeFilter === "pending") {
			matchesFilter = product.status === "pending";
		} else if (activeFilter === "featured") {
			matchesFilter = product.featured === true;
		}
		const matchesSearch =
			product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
			product.seller.toLowerCase().includes(searchValue.toLowerCase()) ||
			product.category.toLowerCase().includes(searchValue.toLowerCase());

		return matchesFilter && matchesSearch;
	});

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
				<button className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					Add Product
				</button>
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
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="flex flex-wrap sm:flex-nowrap rounded-2xl gap-2 bg-[#ECECF0] sm:rounded-full p-1 w-full sm:w-fit">
				{filters.map((filter) => (
					<button
						key={filter.id}
						onClick={() => setActiveFilter(filter.id)}
						className={`
				cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all
				w-[48%] sm:w-auto 
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
				<MarketplaceTable data={filteredProducts} />
			</div>
		</div>
	);
}
