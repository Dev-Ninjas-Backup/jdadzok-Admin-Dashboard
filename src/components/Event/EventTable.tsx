import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

interface Event {
	title: string;
	category: string;
	community: string;
	date: string;
	location: string;
	participants: string;
	status: string;
}

const EventTable: React.FC<{ data: Event[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Project
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							NGO
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Date
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Location
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Participants
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Status
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr
							key={index}
							className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
						>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm font-medium text-[#101828]">
									{row?.title}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span className="text-sm text-[#364153]">{row.community}</span>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153] whitespace-nowrap">
									<Calendar size={16} className="text-[#99A1AF]" />
									{row?.date?.slice(0, 10)}
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153] whitespace-nowrap">
									<MapPin size={16} className="text-[#99A1AF]" />
									{row?.location}
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153]">
									<Users size={16} className="text-[#667085]" />
									{row?.participants}
								</div>
							</td>
							<td className="px-6 py-4">
								<span
									className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
										row?.status === "Upcoming"
											? "bg-[#DBEAFE] text-[#1447E6]"
											: row?.status === "Ongoing"
												? "bg-[#DCFCE7] text-[#008236]"
												: row?.status === "Completed"
													? "bg-[#ECEEF2] text-[#030213]"
													: "bg-[#FFEDD4] text-[#CA3500]"
									}`}
								>
									{row?.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EventTable;
