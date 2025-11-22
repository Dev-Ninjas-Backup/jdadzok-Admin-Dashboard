import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import EventTable from "@/components/Event/EventTable";
import { useGetAllEventOverviewQuery } from "@/redux/features/event/eventApi";
import { useEvent } from "@/redux/features/event/hooks/useEvent";
import { useState } from "react";

export default function EventManagement() {
	const { data } = useGetAllEventOverviewQuery(undefined);
	const [search, setSearch] = useState("");
	const { event, page, setPage, totalPages } = useEvent({
		search,
	});
	const handlePrev = () => setPage(Math.max(1, page - 1));
	const handleNext = () => setPage(Math.min(totalPages, page + 1));

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const stats = [
		{
			title: "Total Events",
			value: `${data?.totalProject}`,
			subtitle: undefined,
			subtitleColor: "#4A5565",
			subtitleIcon: null,
		},
		{
			title: "Upcoming",
			value: `${data?.upcoming}`,
			subtitle: "Ready to start" as string | undefined,
			subtitleColor: "#155DFC", // Blue color
			subtitleIcon: null,
		},
		{
			title: "Ongoing",
			value: `${data?.ongoing}`,
			subtitle: "In progress" as string | undefined,
			subtitleColor: "#00A63E", // Green color
			subtitleIcon: null,
		},
		{
			title: "Pending Approval",
			value: `${data?.pendingApproval}`,
			subtitle: "Awaiting review" as string | undefined,
			subtitleColor: "#F54900", // Orange color
			subtitleIcon: null,
		},
	];

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
				{/* <button className="cursor-pointer bg-[#030213] hover:bg-[#030213] text-white rounded-lg px-1 sm:px-4 py-2">
					Create Event
				</button> */}
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
					value={search}
					onChange={handleSearchChange}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<EventTable data={event} />
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
