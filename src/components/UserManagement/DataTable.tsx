import React from "react";
import {
	useActiveUserMutation,
	useSuspendUserMutation,
} from "@/redux/features/user/userApi";
import { TrendingUp } from "lucide-react";

export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "active" | "suspended" | string;
	level: string;
	points: number;
	joinedAt: string;
}

interface DataTableProps {
	data: User[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
	const [suspendUser] = useSuspendUserMutation();
	const [activeUser] = useActiveUserMutation();

	const getInitials = (name?: string) => {
		if (!name) return "?";
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	};

	const handleAction = async (id: string, status: string) => {
		try {
			if (status === "active") {
				await suspendUser(id).unwrap();
			} else {
				await activeUser(id).unwrap();
			}
		} catch (error) {
			console.error("Action failed:", error);
		}
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
					{data.map((row) => (
						<tr
							key={row.id}
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
											? "bg-[#DCFCE7] text-[#008236]"
											: "bg-[#FFEDD4] text-[#CA3500]"
									}`}
								>
									{row.status}
								</span>
							</td>

							{/* Level */}
							<td className="px-6 py-4">
								<div className="flex items-center gap-2">
									<div className="p-1.5 rounded-full bg-[#DBEAFE] flex items-center justify-center text-sm font-medium text-[#1447E6]">
										{row.level}
									</div>
									<TrendingUp size={16} className="text-[#155DFC]" />
								</div>
							</td>

							{/* Points */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#364153] font-normal">
									{row.points}
								</span>
							</td>

							{/* Joined */}
							<td className="px-6 py-4">
								<span className="text-sm text-[#6A7282] whitespace-nowrap">
									{row.joinedAt?.slice(0, 10)}
								</span>
							</td>

							{/* Actions */}
							<td className="px-6 py-4">
								<button
									onClick={() => handleAction(row.id, row.status)}
									className={`text-sm items-center text-[#ffffff] hover:bg-white justify-center transition-colors border px-3 py-2 rounded-lg cursor-pointer ${
										row.status === "suspended"
											? "bg-[#008236] border-[#008236] hover:text-[#008236]"
											: "bg-[#CA3500] border-[#CA3500] hover:text-[#CA3500]"
									}`}
								>
									{row.status === "suspended" ? "Active" : "Suspend"}
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
