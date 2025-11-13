import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import CommunityTable from "@/components/Community/CommunityTable";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface Community {
	initials: string;
	name: string;
	type: string;
	leader: string;
	members: number;
	level: number;
	events: number;
	status: "verified" | "pending";
}
const stats = [
	{
		title: "Total Communities",
		value: "5",
		subtitle: undefined,
		subtitleColor: "#4A5565",
		subtitleIcon: null,
	},
	{
		title: "Verified",
		value: "3",
		subtitle: "Active" as string | undefined,
		subtitleColor: "#00A63E",
		subtitleIcon: <CheckCircle size={16} />,
	},
	{
		title: "Pending Verification",
		value: "2",
		subtitle: "Awaiting review" as string | undefined,
		subtitleColor: "#F54900",
		subtitleIcon: <Clock size={16} />,
	},
	{
		title: "Total Members",
		value: "6,419",
		subtitle: undefined,
		subtitleColor: "#4A5565",
		subtitleIcon: null,
	},
];

const community: Community[] = [
	{
		initials: "GE",
		name: "Green Earth Foundation",
		status: "verified",
		leader: "Sarah Miller",
		members: 1240,
		level: 8,
		events: 45,
		type: "NGO",
	},
	{
		initials: "OW",
		name: "Ocean Warriors",
		type: "Community",
		leader: "Mike Chen",
		members: 856,
		level: 6,
		events: 32,
		status: "verified",
	},
	{
		initials: "CC",
		name: "Clean City Initiative",
		status: "pending",
		leader: "Emma Davis",
		members: 2100,
		level: 9,
		events: 0,
		type: "NGO",
	},
	{
		initials: "WR",
		name: "Wildlife Rescue Team",
		type: "Community",
		leader: "John Roberts",
		members: 643,
		level: 5,
		events: 28,
		status: "verified",
	},
	{
		initials: "TP",
		name: "Tree Planters United",
		type: "Community",
		leader: "Lisa Park",
		members: 1580,
		level: 7,
		events: 0,
		status: "pending",
	},
];

export default function CommunitiesNGOs() {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Community & NGO Management
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Manage community profiles and verification requests
					</p>
				</div>
				<button className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					Export Users
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
					placeholder="Search communities by name or leader...."
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<CommunityTable data={community} />
			</div>
		</div>
	);
}
