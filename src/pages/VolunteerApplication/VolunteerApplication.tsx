import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
	useGetAllVolunteerProjectsQuery,
	useGetProjectApplicationsQuery,
	useUpdateApplicationStatusMutation,
} from "@/redux/features/volunteer/volunteerApi";
import {
	CheckCircle,
	Clock,
	FileText,
	Filter,
	Search,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

interface Application {
	id: string;
	volunteerId: string;
	projectId: string;
	status: ApplicationStatus;
	workedHours: number;
	completionNote?: string;
	confirmedById?: string;
	createdAt: string;
	updatedAt: string;
	volunteer?: {
		id: string;
		email: string;
	};
}

const statusConfig = {
	PENDING: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Pending" },
	ACCEPTED: { bg: "bg-green-50", text: "text-green-700", label: "Accepted" },
	REJECTED: { bg: "bg-red-50", text: "text-red-700", label: "Rejected" },
};

export default function VolunteerApplication() {
	const [selectedProjectId, setSelectedProjectId] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("");
	const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

	const { data: projectsData, isLoading: projectsLoading } =
		useGetAllVolunteerProjectsQuery(undefined);
	const { data: applicationsData, isLoading: applicationsLoading } =
		useGetProjectApplicationsQuery(selectedProjectId, {
			skip: !selectedProjectId,
		});
	const [updateStatus] = useUpdateApplicationStatusMutation();

	const projects = Array.isArray(projectsData)
		? projectsData
		: projectsData?.data ?? projectsData?.projects ?? [];
	const applications: Application[] = Array.isArray(applicationsData?.applications)
		? applicationsData.applications
		: [];

	const filteredApplications = applications.filter((app) => {
		const matchesSearch = searchQuery
			? app.volunteer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			  app.id.toLowerCase().includes(searchQuery.toLowerCase())
			: true;
		const matchesStatus = statusFilter ? app.status === statusFilter : true;
		return matchesSearch && matchesStatus;
	});

	const pendingCount = applications.filter((a) => a.status === "PENDING").length;
	const acceptedCount = applications.filter((a) => a.status === "ACCEPTED").length;
	const rejectedCount = applications.filter((a) => a.status === "REJECTED").length;

	const handleStatusChange = async (
		applicationId: string,
		newStatus: ApplicationStatus
	) => {
		try {
			await updateStatus({
				applicationId,
				status: newStatus,
				completionNote: noteInputs[applicationId] || undefined,
			}).unwrap();
			toast.success(`Application ${newStatus.toLowerCase()} successfully`);
			setNoteInputs((prev) => {
				const updated = { ...prev };
				delete updated[applicationId];
				return updated;
			});
		} catch {
			throw new Error("Failed to update status");
		}
	};

	const stats = [
		{
			title: "Total Applications",
			value: String(applications.length),
			leftIcon: <FileText size={20} />,
			leftIconColor: "#155DFC",
		},
		{
			title: "Pending",
			value: String(pendingCount),
			leftIcon: <Clock size={20} />,
			leftIconColor: "#F54900",
		},
		{
			title: "Accepted",
			value: String(acceptedCount),
			leftIcon: <CheckCircle size={20} />,
			leftIconColor: "#00A63E",
		},
		{
			title: "Rejected",
			value: String(rejectedCount),
			leftIcon: <XCircle size={20} />,
			leftIconColor: "#E7000B",
		},
	];

	return (
		<div className="space-y-6">
			<div className="mb-10 space-y-1">
				<h1 className="text-xl sm:text-2xl text-[#101828]">
					Volunteer Applications
				</h1>
				<p className="text-[#4A5565] text-sm sm:text-base">
					Monitor and manage volunteer application statuses
				</p>
			</div>

			{projectsLoading ? (
				<p className="text-gray-500">Loading projects...</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="relative">
						<select
							value={selectedProjectId}
							onChange={(e) => setSelectedProjectId(e.target.value)}
							className="appearance-none w-full pl-4 pr-10 py-3 bg-white border border-[#0000001a] rounded-xl text-sm text-gray-700 cursor-pointer focus:outline-none"
						>
							<option value="">Select a project</option>
							{projects.map(
								(project: {
									id: string;
									title?: string;
									name?: string;
								}) => (
									<option key={project.id} value={project.id}>
										{project.title || project.name || project.id}
									</option>
								)
							)}
						</select>
						<Filter
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
							size={16}
						/>
					</div>
				</div>
			)}

			{selectedProjectId && (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						{stats.map((stat, index) => (
							<CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
						))}
					</div>

					<div className="border border-[#0000001a] rounded-xl overflow-hidden p-4">
						<div className="flex md:flex-row flex-col items-stretch md:items-center gap-3">
							<div className="flex-1 relative">
								<Search
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]"
									size={20}
								/>
								<input
									type="text"
									placeholder="Search by volunteer email..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-black placeholder-text-[#717182] focus:outline-none"
								/>
							</div>
							<div className="relative">
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="appearance-none w-full pl-4 pr-10 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none sm:min-w-[140px]"
								>
									<option value="">All Status</option>
									<option value="PENDING">Pending</option>
									<option value="ACCEPTED">Accepted</option>
									<option value="REJECTED">Rejected</option>
								</select>
								<Filter
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
									size={16}
								/>
							</div>
						</div>
					</div>

					<div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
						{applicationsLoading ? (
							<p className="p-6 text-gray-500">Loading applications...</p>
						) : filteredApplications.length === 0 ? (
							<p className="p-6 text-gray-500">
								No applications found for this project.
							</p>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead className="bg-gray-50 text-left text-[#6A7282]">
										<tr>
											<th className="px-4 py-3">Volunteer</th>
											<th className="px-4 py-3">Status</th>
											<th className="px-4 py-3">Hours</th>
											<th className="px-4 py-3">Applied</th>
											<th className="px-4 py-3">Note</th>
											<th className="px-4 py-3">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-100">
										{filteredApplications.map((app) => {
											const statusStyle = statusConfig[app.status];
											return (
												<tr key={app.id} className="hover:bg-gray-50">
													<td className="px-4 py-3">
														<p className="text-[#101828] font-normal">
															{app.volunteer?.email || "Unknown"}
														</p>
														<p className="text-xs text-gray-500">
															ID: {app.id.slice(0, 8)}...
														</p>
													</td>
													<td className="px-4 py-3">
														<span
															className={`inline-flex px-2 py-1 rounded-full text-xs font-normal ${statusStyle.bg} ${statusStyle.text}`}
														>
															{statusStyle.label}
														</span>
													</td>
													<td className="px-4 py-3 text-[#364153]">
														{app.workedHours}h
													</td>
													<td className="px-4 py-3 text-[#6A7282]">
														{new Date(app.createdAt).toLocaleDateString()}
													</td>
													<td className="px-4 py-3">
														<input
															type="text"
															placeholder="Add note..."
															value={noteInputs[app.id] || ""}
															onChange={(e) =>
																setNoteInputs({
																	...noteInputs,
																	[app.id]: e.target.value,
																})
															}
															className="w-full min-w-[120px] px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-300"
														/>
													</td>
													<td className="px-4 py-3">
														<div className="flex items-center gap-2">
															{app.status !== "ACCEPTED" && (
																<button
																	onClick={() =>
																		handleStatusChange(app.id, "ACCEPTED")
																	}
																	className="cursor-pointer px-3 py-1.5 bg-[#008236] text-white rounded-lg text-xs hover:bg-[#006b2b] transition-colors"
																>
																	Accept
																</button>
															)}
															{app.status !== "REJECTED" && (
																<button
																	onClick={() =>
																		handleStatusChange(app.id, "REJECTED")
																	}
																	className="cursor-pointer px-3 py-1.5 text-red-600 border border-red-200 rounded-lg text-xs hover:bg-red-50 transition-colors"
																>
																	Reject
																</button>
															)}
															{app.status !== "PENDING" && (
																<button
																	onClick={() =>
																		handleStatusChange(app.id, "PENDING")
																	}
																	className="cursor-pointer px-3 py-1.5 text-yellow-700 border border-yellow-200 rounded-lg text-xs hover:bg-yellow-50 transition-colors"
																>
																	Reset
																</button>
															)}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
