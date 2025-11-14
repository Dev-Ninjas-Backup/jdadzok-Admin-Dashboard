import React from "react";
import { CheckCircle, Clock, Calendar, MapPin, Users, X } from "lucide-react";

interface Event {
	name: string;
	category: string;
	community: string;
	date: string;
	location: string;
	participants: string;
	status: "upcoming" | "ongoing" | "completed" | "pending";
}

const EventTable: React.FC<{ data: Event[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Event
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Community
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
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr
							key={index}
							className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
						>
							{/* Event */}
							<td className="px-6 py-4">
								<div className="flex flex-col gap-1">
									<div className="text-sm font-medium text-[#101828]">
										{row.name}
									</div>
									<div className="text-xs text-[#0A0A0A]  border border-[#0000001a] rounded-lg px-2 py-1 w-fit">
										{row.category}
									</div>
								</div>
							</td>

							{/* Community */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153]">{row.community}</span>
							</td>

							{/* Date */}
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153]">
									<Calendar size={16} className="text-[#99A1AF]" />
									{row.date}
								</div>
							</td>

							{/* Location */}
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153]">
									<MapPin size={16} className="text-[#99A1AF]" />
									{row.location}
								</div>
							</td>

							{/* Participants */}
							<td className="px-6 py-4">
								<div className="flex items-start gap-2 text-sm text-[#364153]">
									<Users size={16} className="text-[#667085]" />
									{row.participants}
								</div>
							</td>

							{/* Status */}
							<td className="px-6 py-4">
								<span
									className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
										row.status === "upcoming"
											? "bg-[#DBEAFE] text-[#1447E6]"
											: row.status === "ongoing"
											? "bg-[#DCFCE7] text-[#008236]"
											: row.status === "completed"
											? "bg-[#ECEEF2] text-[#030213]"
											: "bg-[#FFEDD4] text-[#CA3500]"
									}`}
								>
									{row.status === "upcoming" && "Upcoming"}
									{row.status === "ongoing" && "Ongoing"}
									{row.status === "completed" && "Completed"}
									{row.status === "pending" && (
										<>
											<Clock size={14} />
											Pending
										</>
									)}
								</span>
							</td>

							{/* Actions */}
							<td className="px-6 py-4">
								<div className="flex items-center gap-2">
									<button className="text-sm text-[#0A0A0A] items-center justify-center hover:text-[#1D2939] transition-colors border border-[#0000001a]  px-3 py-2  rounded-lg cursor-pointer">
										View
									</button>
									{row.status === "pending" && (
										<>
											<button className=" flex items-center justify-center text-[#027A48] hover:bg-[#F6FEF9] rounded-lg transition-colors px-3 py-2 cursor-pointer border border-[#0000001a]">
												<CheckCircle size={18} />
											</button>
											<button className=" flex items-center justify-center text-[#D92D20] hover:bg-[#FEF3F2] rounded-lg transition-colors px-3 py-2 cursor-pointer border border-[#0000001a]">
												<X size={18} />
											</button>
										</>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EventTable;
