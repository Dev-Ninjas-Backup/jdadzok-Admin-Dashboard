import CardWithoutIcon from "@/components/common/CardWithoutIcon";

import DataTable from "@/components/UserManagement/DataTable";
import FilterBar from "@/components/UserManagement/FilterBar";

const stats = [
	{
		title: "Total Users",
		value: "5,342",
		subtitle: "+12% this month",
		subtitleColor: "#00A63E",
	},
	{
		title: "Active Users",
		value: "4,891",
		subtitle: "91.6% of total",
	},
	{
		title: "New This Week",
		value: "234",
		subtitle: "+18% vs last week",
		subtitleColor: "#00A63E",
	},
	{
		title: "Suspended",
		value: "58",
		subtitle: "Requires attention",
		subtitleColor: "#E7000B",
	},
];

const tableData = [
	{
		initials: "JD",
		name: "John Davis",
		email: "john.davis@email.com",
		role: "Volunteer",
		status: "active",
		level: "5",
		points: 1250,
		joined: "2024-01-15",
	},
	{
		initials: "SM",
		name: "Sarah Miller",
		email: "sarah.m@email.com",
		role: "Community Leader",
		status: "active",
		level: "8",
		points: 3400,
		joined: "2023-11-20",
	},
	{
		initials: "MJ",
		name: "Mike Johnson",
		email: "mike.j@email.com",
		role: "Volunteer",
		status: "active",
		level: "3",
		points: 680,
		joined: "2024-03-10",
	},
	{
		initials: "EC",
		name: "Emily Chen",
		email: "emily.chen@email.com",
		role: "Seller",
		status: "suspended",
		level: "4",
		points: 920,
		joined: "2024-02-05",
	},
	{
		initials: "RT",
		name: "Robert Taylor",
		email: "r.taylor@email.com",
		role: "Volunteer",
		status: "active",
		level: "6",
		points: 1890,
		joined: "2023-12-08",
	},
	{
		initials: "LA",
		name: "Lisa Anderson",
		email: "lisa.a@email.com",
		role: "Community Leader",
		status: "active",
		level: "7",
		points: 2560,
		joined: "2024-01-22",
	},
];

export default function UserManagement() {
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						User Management
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Manage and monitor all platform users
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
						subtitleColor={stat.subtitleColor}
						gap={32}
					/>
				))}
			</div>
			<div className="border border-[#0000001a] rounded-xl overflow-hidden">
				<FilterBar
					searchPlaceholder="Search by name or email..."
					onSearchChange={(value: string) => console.log("Search:", value)}
					onStatusChange={(value: string) => console.log("Status:", value)}
					onRoleChange={(value: string) => console.log("Role:", value)}
					onMoreFiltersClick={() => console.log("More filters clicked")}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<DataTable data={tableData} />
			</div>
		</div>
	);
}
