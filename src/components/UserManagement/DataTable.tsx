import { MoreVertical, TrendingUp } from "lucide-react";

interface User {
	name: string;
	email: string;
	role: string;
	status: string;
	level: string;
	points: number;
	joined: string;
}

const DataTable: React.FC<{ data: User[] }> = ({ data }) => {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							User
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Role
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Status
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Level
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Points
						</th>
						<th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
							Joined
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
							{/* User */}
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-[#0A0A0A]">
										{getInitials(row.name)}
									</div>
									<div>
										<div className="text-sm font-normal text-[#101828]">
											{row.name}
										</div>
										<div className="text-sm text-[#6A7282] font-normal">
											{row.email}
										</div>
									</div>
								</div>
							</td>

							{/* Role */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal">
									{row.role}
								</span>
							</td>

							{/* Status */}
							<td className="px-6 py-4">
								<span
									className={`inline-flex px-2 py-1 rounded-full text-xs font-normal ${
										row.status === "active"
											? "bg-[#030213] text-white"
											: "bg-[#ECEEF2] text-[#030213]"
									}`}
								>
									{row.status}
								</span>
							</td>

							{/* Level */}
							<td className="px-6 py-4">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-sm font-medium text-[#1447E6]">
										{row.level}
									</div>
									<TrendingUp size={16} className="text-[#155DFC]" />
								</div>
							</td>

							{/* Points */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal">
									{row.points.toLocaleString()}
								</span>
							</td>

							{/* Joined */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#6A7282]">{row.joined}</span>
							</td>

							{/* Actions */}
							<td className="px-6 py-4">
								<button className="p-1 hover:bg-gray-200 rounded transition-colors">
									<MoreVertical size={18} className="text-[#0A0A0A]" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
