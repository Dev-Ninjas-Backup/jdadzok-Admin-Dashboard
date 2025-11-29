import CardWithoutIcon from "@/components/common/CardWithoutIcon";
// import NotificationsTable from "@/components/Notification/NotificationsTable";
import { Bell, Calendar, DollarSign, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useState } from "react";
import {
	useGetNotificationOverviewQuery,
	useNotificationMutation,
	useScheduleNotificationMutation,
} from "@/redux/features/notification/notificationApi";

// interface Transaction {
// 	id: string;
// 	name: string;
// 	type: "Seller" | "NGO";
// 	avatar: string; // Letter for avatar (G, O, etc.)
// 	amount: string;
// 	date: string;
// 	paymentMethod: "Bank Transfer" | "PayPal";
// 	accountInfo: string; // Last 4 digits or email
// 	totalEarned: string;
// }

// const sampleTransactions: Transaction[] = [
// 	{
// 		id: "1",
// 		name: "Green Store",
// 		type: "Seller",
// 		avatar: "G",
// 		amount: "$2450.00",
// 		date: "2024-06-15",
// 		paymentMethod: "Bank Transfer",
// 		accountInfo: "****5678",
// 		totalEarned: "$2695.50",
// 	},
// 	{
// 		id: "2",
// 		name: "Ocean Warriors NGO",
// 		type: "NGO",
// 		avatar: "O",
// 		amount: "$1850.00",
// 		date: "2024-06-14",
// 		paymentMethod: "PayPal",
// 		accountInfo: "ocean@ngo.org",
// 		totalEarned: "$2120.00",
// 	},
// ];

export default function Notifications() {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [scheduleDate, setScheduleDate] = useState<Date | null>(null); // for DatePicker
	const [formattedSchedule, setFormattedSchedule] = useState<string>(""); // for sending
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { data } = useGetNotificationOverviewQuery(undefined);
	const [notification] = useNotificationMutation();
	const [scheduleNotification] = useScheduleNotificationMutation();

	const handleSendNow = async () => {
		try {
			if (formattedSchedule) {
				await scheduleNotification({
					title,
					message,
					formattedSchedule,
				}).unwrap();
				console.log("Sending notification with");
			} else {
				await notification({
					title,
					message,
				}).unwrap();
				
			}
		} catch (err) {
			console.log("Sending notification failed", err);
		}
	};

	const handleSchedule = () => setShowDatePicker(true);
	const stats = [
		{
			title: "Sent Today",
			value: `${data?.todayCount}`,
			leftIconColor: "#155DFC",
			leftIcon: <Bell size={20} />,
		},
		{
			title: "Total Notifications",
			value: `${data?.totalNotifications}`,
			leftIconColor: "#9810FA",
			leftIcon: <Calendar size={20} />,
		},
		{
			title: "Open Rate",
			value: `${data?.openRate}%`,
			leftIconColor: "#00A63E",
			leftIcon: <DollarSign size={20} />,
		},

		{
			title: "This Month",
			value: `${data?.thisMonthCount}`,
			leftIconColor: "#F54900",
			leftIcon: <Send size={20} />,
		},
	];
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
					{/* <div className=" flex items-center gap-3 flex-row max-[440px]:flex-col">
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
					</div> */}

					{/* Action Buttons */}
					<div className="flex items-center gap-3 flex-row max-[440px]:flex-col relative">
						<button
							onClick={handleSendNow}
							className="max-[440px]:w-full justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[#030213] text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
						>
							<Send size={16} />
							Send Now
						</button>

						<button
							onClick={handleSchedule}
							className="max-[440px]:w-full justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A0A0A] rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
						>
							<Calendar size={16} />
							Schedule for Later
						</button>

						{/* Date Picker Popup */}
						{showDatePicker && (
							<div className="absolute z-50 mt-2 bg-white p-3 rounded-lg shadow-lg">
								<DatePicker
									selected={scheduleDate}
									onChange={(date) => {
										setScheduleDate(date);
										if (date) {
											const formatted = format(date, "yyyy-MM-dd h.mm a");
											setFormattedSchedule(formatted);
										}
									}}
									showTimeSelect
									inline
									minDate={new Date()}
									shouldCloseOnSelect={false}
								/>
								<div className="flex justify-end mt-2">
									<button
										onClick={() => setShowDatePicker(false)}
										className="text-white rounded-lg cursor-pointer bg-[#008236] px-3 py-1.5  hover:text-[#008236] hover:bg-white border hover:border-[#008236]"
									>
										Done
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* <div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<NotificationsTable data={sampleTransactions} />
			</div> */}
		</div>
	);
}
