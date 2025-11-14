import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import EventTable from "@/components/Event/EventTable";
import { useState } from "react";

interface Event {
	name: string;
	category: string;
	community: string;
	date: string;
	location: string;
	participants: string;
	status: "upcoming" | "ongoing" | "completed" | "pending";
}

const stats = [
	{
		title: "Total Events",
		value: "5",
		subtitle: undefined,
		subtitleColor: "#4A5565",
		subtitleIcon: null,
	},
	{
		title: "Upcoming",
		value: "2",
		subtitle: "Ready to start" as string | undefined,
		subtitleColor: "#155DFC", // Blue color
		subtitleIcon: null,
	},
	{
		title: "Ongoing",
		value: "1",
		subtitle: "In progress" as string | undefined,
		subtitleColor: "#00A63E", // Green color
		subtitleIcon: null,
	},
	{
		title: "Pending Approval",
		value: "1",
		subtitle: "Awaiting review" as string | undefined,
		subtitleColor: "#F54900", // Orange color
		subtitleIcon: null,
	},
];

const sampleEvents: Event[] = [
	{
		name: "Beach Cleanup Drive",
		category: "Cleanup",
		community: "Ocean Warriors",
		date: "2024-06-20",
		location: "Santa Monica Beach",
		participants: "145/200",
		status: "upcoming",
	},
	{
		name: "Tree Planting Marathon",
		category: "Planting",
		community: "Green Earth Foundation",
		date: "2024-06-18",
		location: "Central Park",
		participants: "89/100",
		status: "ongoing",
	},
	{
		name: "Wildlife Education Workshop",
		category: "Workshop",
		community: "Wildlife Rescue Team",
		date: "2024-06-15",
		location: "Community Center",
		participants: "67/75",
		status: "completed",
	},
	{
		name: "River Cleanup Initiative",
		category: "Cleanup",
		community: "Clean City Initiative",
		date: "2024-06-25",
		location: "Hudson River",
		participants: "0/150",
		status: "pending",
	},
	{
		name: "Community Garden Setup",
		category: "Gardening",
		community: "Tree Planters United",
		date: "2024-06-22",
		location: "Downtown Square",
		participants: "32/50",
		status: "upcoming",
	},
];

export default function EventManagement() {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Event Management
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Monitor and manage all community events
					</p>
				</div>
				<button className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					Create Event
				</button>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<CardWithoutIcon
						key={index}
						title={stat.title}
						value={stat.value}
						subtitle={stat.subtitle}
						subtitleIcon={stat.subtitleIcon}
						subtitleColor={stat.subtitleColor}
						gap={32}
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

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<EventTable data={sampleEvents} />
			</div>
		</div>
	);
}
