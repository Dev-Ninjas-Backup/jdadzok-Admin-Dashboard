import React from "react";
import { Eye, CheckCircle, Clock } from "lucide-react";

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

const CommunityTable: React.FC<{ data: Community[] }> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Community
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Type
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Leader
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Members
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Level
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Events
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
							{/* Community */}
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
										{row.initials}
									</div>
									<div className="text-sm font-normal text-[#101828] whitespace-nowrap">
										{row.name}
									</div>
								</div>
							</td>

							{/* Type */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#0A0A0A] font-normal border border-[#0000001a] rounded-xl overflow-hidden px-2 py-1 whitespace-nowrap">
									{row.type}
								</span>
							</td>

							{/* Leader */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal whitespace-nowrap">
									{row.leader}
								</span>
							</td>

							{/* Members */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal">
									{row.members.toLocaleString()}
								</span>
							</td>

							{/* Level */}
							<td className="px-6 py-4">
								<div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-sm font-medium text-[#8200DB]">
									{row.level}
								</div>
							</td>

							{/* Events */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal">
									{row.events}
								</span>
							</td>

							{/* Status */}
							<td className="px-6 py-4">
								<span
									className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-normal ${
										row.status === "verified"
											? "bg-[#DCFCE7] text-[#008236]"
											: "bg-[#ECEEF2] text-[#030213]"
									}`}
								>
									{row.status === "verified" ? (
										<>
											<CheckCircle size={14} />
											Verified
										</>
									) : (
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
									<button className="cursor-pointer flex items-center gap-1.5 text-sm bg-[#FFFFFF] text-[#0A0A0A] hover:text-gray-900 transition-colors px-3 py-1.5 rounded-xl border border-[#0000001a]">
										<Eye size={16} />
										View
									</button>
									{row.status === "pending" && (
										<button className="cursor-pointer px-3 py-1.5 bg-[#030213] text-white text-sm rounded-xl hover:bg-gray-800 transition-colors">
											Review
										</button>
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

export default CommunityTable;
