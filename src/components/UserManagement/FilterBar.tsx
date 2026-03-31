import { ChevronDown } from "lucide-react";
import SearchBar from "../common/SearchBar";
import { useState } from "react";

interface FilterBarProps {
	searchPlaceholder?: string;
	statusOptions?: string[];
	roleOptions?: string[];
	onSearchChange?: (value: string) => void;
	onStatusChange?: (value: string) => void;
	onRoleChange?: (value: string) => void;
	onMoreFiltersClick?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
	searchPlaceholder = "Search by name or email...",
	statusOptions = ["All Status", "Active", "Suspended"],
	roleOptions = ["All Roles", "Admin", "User", "Moderator"],
	onSearchChange,
	onStatusChange,
	onRoleChange,
	// onMoreFiltersClick,
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
	const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		onSearchChange?.(e.target.value);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value; // "" if All Status
		setSelectedStatus(value);
		onStatusChange?.(value);
	};

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value; // "" if All Roles
		setSelectedRole(value);
		onRoleChange?.(value);
	};

	return (
		<div className="flex md:flex-row flex-col items-stretch md:items-center gap-3 p-4 bg-white">
			{/* Search Bar */}
			<div className="w-full md:flex-1">
				<SearchBar
					placeholder={searchPlaceholder}
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>

			{/* Filters Container */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
				{/* Status Dropdown */}
				<div className="relative w-full sm:w-auto">
					<select
						value={selectedStatus}
						onChange={handleStatusChange}
						className="appearance-none w-full pl-4 pr-10 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none sm:min-w-[140px]"
					>
						{statusOptions.map((option) => (
							<option
								key={option}
								value={option === "All Status" ? "" : option.toLowerCase()}
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

				{/* Role Dropdown */}
				<div className="relative w-full sm:w-auto">
					<select
						value={selectedRole}
						onChange={handleRoleChange}
						className="appearance-none w-full pl-4 pr-10 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none sm:min-w-[140px]"
					>
						{roleOptions.map((option) => (
							<option
								key={option}
								value={option === "All Roles" ? "" : option.toUpperCase()}
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

				{/* More Filters Button */}
				{/* <button
					onClick={onMoreFiltersClick}
					className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none whitespace-nowrap"
				>
					<Filter size={16} />
					More Filters
				</button> */}
			</div>
		</div>
	);
};

export default FilterBar;
