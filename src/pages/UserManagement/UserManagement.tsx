import CardWithoutIcon from "@/components/common/CardWithoutIcon";

import DataTable from "@/components/UserManagement/DataTable";
import FilterBar from "@/components/UserManagement/FilterBar";
import { useUser } from "@/redux/features/user/hooks/useUser";
import { useGetAllUserOverviewQuery } from "@/redux/features/user/userApi";

import { useState } from "react";

export default function UserManagement() {
	const { data } = useGetAllUserOverviewQuery(undefined);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("All Status");
	const [role, setRole] = useState("All Roles");

	// Call the custom hook with filters
	const filters = {
		search: search || undefined, // include only if not empty
		...(status !== "All Status" && { status }),
		...(role !== "All Roles" && { role }),
	};
	const { user, page, setPage, totalPages } = useUser(filters);
	const handlePrev = () => setPage(Math.max(1, page - 1));
	const handleNext = () => setPage(Math.min(totalPages, page + 1));

	const stats = [
		{
			title: "Total Users",
			value: `${data?.totalUsers}`,
			subtitle: `${data?.totalUsersGrowth} this month`,
			subtitleColor: "#00A63E",
		},
		{
			title: "Active Users",
			value: `${data?.totalUsers}`,
			subtitle: `${data?.totalUsersGrowth}% of total`,
		},
		{
			title: "New This Week",
			value: `${data?.newThisWeek}`,
			subtitle: `${data?.totalUsersGrowth}% vs last week`,
			subtitleColor: "#00A63E",
		},
		{
			title: "Suspended",
			value: `${data?.suspendedUsers}`,
			subtitle: "Requires attention",
			subtitleColor: "#E7000B",
		},
	];

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
					onSearchChange={(value) => setSearch(value)}
					onStatusChange={(value) => setStatus(value)}
					onRoleChange={(value) => setRole(value)}
					onMoreFiltersClick={() => console.log("More filters clicked")}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<DataTable data={user} />
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
