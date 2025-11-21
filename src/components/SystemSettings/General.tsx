import { Globe } from "lucide-react";
import { useState } from "react";

export default function General() {
	const [platformName, setPlatformName] = useState("Community Platform");
	const [supportEmail, setSupportEmail] = useState("support@platform.com");
	const [platformUrl, setPlatformUrl] = useState("https://platform.com");
	const [maintenanceMode, setMaintenanceMode] = useState(false);
	// const [backupMode, setBackupMode] = useState(false);
	const [maxEvents, setMaxEvents] = useState("10");
	// const [maxDays, setMaxDays] = useState("90");
	const [maxPosts, setMaxPosts] = useState("5");

	return (
		<div className="space-y-6">
			<div className="w-full  mx-auto bg-white rounded-xl border border-[#0000001a] p-6">
				{/* Header */}
				<div className="flex items-center gap-3 mb-12">
					<Globe size={20} className="text-[#155DFC]" />

					<div className="space-y-1.5">
						<h2 className="text-base font-medium text-[#101828]">
							Platform Information
						</h2>
						<p className="text-sm text-[#4A5565] ">
							Basic platform configuration
						</p>
					</div>
				</div>

				<div className="space-y-6">
					{/* Platform Name */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Platform Name
						</label>
						<input
							type="text"
							value={platformName}
							onChange={(e) => setPlatformName(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					{/* Support Email */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Support Email
						</label>
						<input
							type="email"
							value={supportEmail}
							onChange={(e) => setSupportEmail(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					{/* Platform URL */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Platform URL
						</label>
						<input
							type="url"
							value={platformUrl}
							onChange={(e) => setPlatformUrl(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
					<div className="border-b border-[#0000001a]" />
					{/* Maintenance Mode */}
					<div>
						<div className="flex items-center justify-between">
							<div>
								<label className="block text-sm font-medium text-[#101828]">
									Maintenance Mode
								</label>
								<p className="text-sm text-[#4A5565] mt-0.5">
									Temporarily disable platform access
								</p>
							</div>
							<button
								onClick={() => setMaintenanceMode(!maintenanceMode)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
									maintenanceMode ? "bg-[#030213]" : "bg-[#CBCED4]"
								}`}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										maintenanceMode ? "translate-x-6" : "translate-x-1"
									}`}
								/>
							</button>
						</div>
					</div>

					{/* Max Events Per Community */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Max Events Per Community
						</label>
						<input
							type="number"
							value={maxEvents}
							onChange={(e) => setMaxEvents(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					{/* Max Posts Per Day */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Max Posts Per Day
						</label>
						<input
							type="number"
							value={maxPosts}
							onChange={(e) => setMaxPosts(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
				</div>
			</div>

			{/* <div className="w-full  mx-auto bg-white rounded-xl border border-[#0000001a] p-6">
			
				<div className="flex items-center gap-3 mb-12">
					<Database size={20} className="text-[#155DFC]" />

					<div className="space-y-1.5">
						<h2 className="text-base font-medium text-[#101828]">
							Data Management
						</h2>
						<p className="text-sm text-[#4A5565] ">
							Backup and data retention settings
						</p>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<div className="flex items-center justify-between">
							<div>
								<label className="block text-sm font-medium text-[#101828]">
									Automatic Backups
								</label>
								<p className="text-sm text-[#4A5565] mt-0.5">
									Daily automated database backups
								</p>
							</div>
							<button
								onClick={() => setBackupMode(!backupMode)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
									backupMode ? "bg-[#030213]" : "bg-[#CBCED4]"
								}`}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										backupMode ? "translate-x-6" : "translate-x-1"
									}`}
								/>
							</button>
						</div>
					</div>

			
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Data Retention (days)
						</label>
						<input
							type="number"
							value={maxDays}
							onChange={(e) => setMaxDays(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
					<div className="border-b border-[#0000001a]" />
					<div className=" flex items-center gap-3 flex-row max-[350px]:flex-col">
						<button className="max-[440px]:w-full  justify-center cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#030213] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
							Backup Now
						</button>
						<button className=" max-[440px]:w-full  justify-center cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0A0A0A] rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
							Export Data
						</button>
					</div>
				</div>
			</div> */}
		</div>
	);
}
