import { Search } from "lucide-react";

// SearchBar Component
interface SearchBarProps {
	placeholder?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = "Search...",
	value,
	onChange,
}) => {
	return (
		<div className="flex-1 relative gap-3">
			<Search
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]"
				size={20}
			/>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="w-full pl-10 pr-4 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[black] placeholder-text-[#717182] focus:outline-none"
			/>
		</div>
	);
};

export default SearchBar;
