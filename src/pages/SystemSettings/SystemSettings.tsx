// import Financial from "@/components/SystemSettings/Financial";
import General from "@/components/SystemSettings/General";
import SettingsForm from "@/components/SystemSettings/SettingsForm/SettingsForm";
// import { Save } from "lucide-react";
// import { useState } from "react";

export default function SystemSettings() {
	// const [activeFilter, setActiveFilter] = useState("general");

	// const filters = [
	// 	{ id: "general", label: "General" },
	// 	{ id: "financial", label: "Financial" },
	// ];

	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						System Settings
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Configure platform-wide settings and preferences
					</p>
				</div>
				{/* <button className="flex items-center text-sm sm:text-base justify-center gap-0.5 sm:gap-2 w-auto cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					<Save size={16} />
					Save All
				</button> */}
			</div>

			{/* <div className=" flex items-center gap-2 bg-[#ECECF0] rounded-full p-1 w-fit">
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
					</button>
				))}
			</div>
			{activeFilter === "general" ? <General /> : <Financial />} */}
			<General />
			<SettingsForm/>
		</div>
	);
}
