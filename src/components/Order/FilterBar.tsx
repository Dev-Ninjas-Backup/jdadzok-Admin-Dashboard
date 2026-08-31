import { ChevronDown } from "lucide-react";
import SearchBar from "../common/SearchBar";
import { useState } from "react";

interface FilterBarProps {
	searchPlaceholder?: string;
	statusOptions?: string[];
	onSearchChange?: (value: string) => void;
	onStatusChange?: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
	searchPlaceholder = "Search by order ID or customer...",
	statusOptions = [
		"All Status",
		"Paid",
		"Delivered",
		"Shipped",
		"Refunded",
		"Cancelled",
		"Pending",
	],
	onSearchChange,
	onStatusChange,
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		onSearchChange?.(e.target.value);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStatus(e.target.value);
		onStatusChange?.(e.target.value);
	};

	return (
		<div className="flex md:flex-row flex-col items-stretch md:items-center gap-3 p-4 bg-white">
			<div className="w-full md:flex-1">
				<SearchBar
					placeholder={searchPlaceholder}
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="relative w-full sm:w-auto">
				<select
					value={selectedStatus}
					onChange={handleStatusChange}
					className="appearance-none w-full pl-4 pr-10 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none sm:min-w-[140px]"
				>
					{statusOptions.map((option) => (
						<option
							key={option}
							value={option === "All Status" ? "" : option.toUpperCase()}
						>
							{option}
						</option>
					))}
				</select>
				<ChevronDown
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
					size={16}
				/>
			</div>
		</div>
	);
};

export default FilterBar;
