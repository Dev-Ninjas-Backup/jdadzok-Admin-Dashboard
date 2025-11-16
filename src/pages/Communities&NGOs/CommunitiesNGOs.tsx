import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import SearchBar from "@/components/common/SearchBar";
import CommunityTable from "@/components/Community/CommunityTable";
import { useGetAllCommunitiesOverviewQuery } from "@/redux/features/communities/communitiesApi";
import { useCommunities } from "@/redux/features/communities/hooks/communities";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function CommunitiesNGOs() {
	const [search, setSearch] = useState("");
	const { data } = useGetAllCommunitiesOverviewQuery(undefined);

	const { community, page, setPage, totalPages } = useCommunities({
		search,
	});
	const handlePrev = () => setPage(Math.max(1, page - 1));
	const handleNext = () => setPage(Math.min(totalPages, page + 1));

	const stats = [
		{
			title: "Total Communities",
			value: `${data?.totalCommunityAndNgo}`,
			subtitle: undefined,
			subtitleColor: "#4A5565",
			subtitleIcon: null,
		},
		{
			title: "Verified",
			value: `${data?.Verified}`,
			subtitle: "Active" as string | undefined,
			subtitleColor: "#00A63E",
			subtitleIcon: <CheckCircle size={16} />,
		},
		{
			title: "Pending Verification",
			value: `${data?.PendingVerification}`,
			subtitle: "Awaiting review" as string | undefined,
			subtitleColor: "#F54900",
			subtitleIcon: <Clock size={16} />,
		},
		{
			title: "Total Members",
			value: `${data?.totalFollowers}`,
			subtitle: undefined,
			subtitleColor: "#4A5565",
			subtitleIcon: null,
		},
	];

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
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
					value={search}
					onChange={handleSearchChange}
				/>
			</div>

			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<CommunityTable data={community} />
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
