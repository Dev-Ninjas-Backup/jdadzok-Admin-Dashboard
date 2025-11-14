import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import NotificationsTable from "@/components/Notification/NotificationsTable";
import { Bell, Calendar, DollarSign, Send, Users } from "lucide-react";
import { useState } from "react";

interface Transaction {
	id: string;
	name: string;
	type: "Seller" | "NGO";
	avatar: string; // Letter for avatar (G, O, etc.)
	amount: string;
	date: string;
	paymentMethod: "Bank Transfer" | "PayPal";
	accountInfo: string; // Last 4 digits or email
	totalEarned: string;
}

const stats = [
	{
		title: "Sent Today",
		value: "45",
		leftIconColor: "#155DFC", // Orange color
		leftIcon: <Bell size={20} />,
	},
	{
		title: "Scheduled",
		value: "2",
		leftIconColor: "#9810FA", // Green color
		leftIcon: <Calendar size={20} />,
	},
	{
		title: "Open Rate",
		value: "68.46%",
		leftIconColor: "#00A63E", // Blue color
		leftIcon: <DollarSign size={20} />,
	},

	{
		title: "This Month",
		value: "430",
		leftIconColor: "#F54900",
		leftIcon: <Send size={20} />,
	},
];

const sampleTransactions: Transaction[] = [
	{
		id: "1",
		name: "Green Store",
		type: "Seller",
		avatar: "G",
		amount: "$2450.00",
		date: "2024-06-15",
		paymentMethod: "Bank Transfer",
		accountInfo: "****5678",
		totalEarned: "$2695.50",
	},
	{
		id: "2",
		name: "Ocean Warriors NGO",
		type: "NGO",
		avatar: "O",
		amount: "$1850.00",
		date: "2024-06-14",
		paymentMethod: "PayPal",
		accountInfo: "ocean@ngo.org",
		totalEarned: "$2120.00",
	},
];

export default function Notifications() {
	const [targetAudience, setTargetAudience] = useState("all-users");
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const audiences = [
		{ value: "all-users", label: "All Users" },
		{ value: "sellers", label: "Sellers" },
		{ value: "ngos", label: "NGOs" },
		{ value: "customers", label: "Customers" },
	];

	const handleSendNow = () => {
		console.log("Sending notification:", { targetAudience, title, message });
	};

	const handleSchedule = () => {
		console.log("Opening schedule modal");
	};
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						Notifications & Announcements
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Send custom notifications to users and communities
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<CardWithoutIcon
						key={index}
						title={stat.title}
						value={stat.value}
						leftIcon={stat.leftIcon}
						leftIconColor={stat.leftIconColor}
						gapX={12}
						gap={6}
					/>
				))}
			</div>
			<div className="w-full  mx-auto bg-white rounded-xl border border-[#0000001a] p-6">
				<h2 className="text-base font-medium text-[#101828] mb-8">
					Compose Notification
				</h2>

				<div className="space-y-4">
					{/* Target Audience */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Target Audience
						</label>
						<div className="relative">
							<div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
								<Users size={18} className="text-[#717182]" />
							</div>
							<select
								value={targetAudience}
								onChange={(e) => setTargetAudience(e.target.value)}
								className="w-full pl-11 pr-4 py-3 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200"
							>
								{audiences.map((audience) => (
									<option key={audience.value} value={audience.value}>
										{audience.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Notification Title */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Notification Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter notification title..."
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-[#717182] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					{/* Message */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Message
						</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Enter your message..."
							rows={4}
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-[#717182] resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					{/* Action Buttons */}
					<div className=" flex items-center gap-3 flex-row max-[440px]:flex-col">
						<button
							onClick={handleSendNow}
							className="max-[440px]:w-full  justify-center cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-[#030213] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
						>
							<Send size={16} />
							Send Now
						</button>
						<button
							onClick={handleSchedule}
							className=" max-[440px]:w-full  justify-center cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A0A0A] rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
						>
							<Calendar size={16} />
							Schedule for Later
						</button>
					</div>
				</div>
			</div>
			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<NotificationsTable data={sampleTransactions} />
			</div>
		</div>
	);
}
