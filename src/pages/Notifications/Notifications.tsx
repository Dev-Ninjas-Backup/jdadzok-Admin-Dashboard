import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import NotificationsTable from "@/components/Notification/NotificationsTable";
import { Bell, Calendar, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useState } from "react";
import {
	useGetAllNotificationsQuery,
	useGetNotificationOverviewQuery,
	useLatestNotificationQuery,
	useNotificationMutation,
	useScheduleNotificationMutation,
} from "@/redux/features/notification/notificationApi";
import toast from "react-hot-toast";

export default function Notifications() {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
	const [formattedSchedule, setFormattedSchedule] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [historySource, setHistorySource] = useState<"recent" | "all">(
		"recent"
	);

	const { data } = useGetNotificationOverviewQuery(undefined);
	const { data: latest = [] } = useLatestNotificationQuery(undefined);
	const { data: allNotifications = [] } = useGetAllNotificationsQuery(
		undefined,
		{ skip: historySource !== "all" }
	);
	const [notification] = useNotificationMutation();
	const [scheduleNotification] = useScheduleNotificationMutation();

	const recentList = Array.isArray(latest) ? latest : latest?.data ?? [];
	const allList = Array.isArray(allNotifications)
		? allNotifications
		: allNotifications?.data ?? allNotifications?.notifications ?? [];
	const displayList = historySource === "all" ? allList : recentList;

	const handleSendNow = async () => {
		if (!title.trim() || !message.trim()) {
			toast.error("Title and message are required");
			return;
		}
		try {
			if (formattedSchedule) {
				await scheduleNotification({
					title,
					message,
					scheduleTime: formattedSchedule,
				}).unwrap();
				toast.success("Notification scheduled");
			} else {
				await notification({ title, message }).unwrap();
				toast.success("Notification sent");
			}
			setTitle("");
			setMessage("");
			setFormattedSchedule("");
			setScheduleDate(null);
			setShowDatePicker(false);
		} catch {
			toast.error("Failed to send notification");
		}
	};

	const stats = [
		{
			title: "Sent Today",
			value: `${data?.todayCount ?? 0}`,
			leftIconColor: "#155DFC",
			leftIcon: <Bell size={20} />,
		},
		{
			title: "Total Notifications",
			value: `${data?.totalNotifications ?? 0}`,
			leftIconColor: "#9810FA",
			leftIcon: <Calendar size={20} />,
		},
		{
			title: "Open Rate",
			value: `${data?.openRate ?? 0}%`,
			leftIconColor: "#00A63E",
			leftIcon: <Send size={20} />,
		},
		{
			title: "This Month",
			value: `${data?.thisMonthCount ?? 0}`,
			leftIconColor: "#F54900",
			leftIcon: <Send size={20} />,
		},
	];

	return (
		<div className="space-y-6">
			<div className="mb-10 space-y-1">
				<h1 className="text-xl sm:text-2xl text-[#101828]">
					Notifications & Announcements
				</h1>
				<p className="text-[#4A5565] text-sm sm:text-base">
					Send custom notifications to users and communities
				</p>
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
			<div className="w-full mx-auto bg-white rounded-xl border border-[#0000001a] p-6">
				<h2 className="text-base font-medium text-[#101828] mb-8">
					Compose Notification
				</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Notification Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter notification title..."
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Message
						</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Enter your message..."
							rows={4}
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm resize-none"
						/>
					</div>
					<div className="flex items-center gap-3 flex-wrap relative">
						<button
							onClick={handleSendNow}
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#030213] text-white rounded-lg text-sm cursor-pointer"
						>
							<Send size={16} />
							{formattedSchedule ? "Schedule" : "Send Now"}
						</button>
						<button
							onClick={() => setShowDatePicker(!showDatePicker)}
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg text-sm cursor-pointer"
						>
							<Calendar size={16} />
							{formattedSchedule || "Pick schedule time"}
						</button>
						{showDatePicker && (
							<div className="absolute z-50 top-full mt-2 bg-white p-3 rounded-lg shadow-lg">
								<DatePicker
									selected={scheduleDate}
									onChange={(date) => {
										setScheduleDate(date);
										if (date) {
											setFormattedSchedule(
												format(date, "yyyy-MM-dd h.mm a")
											);
										}
									}}
									showTimeSelect
									inline
									minDate={new Date()}
								/>
								<div className="flex justify-end mt-2">
									<button
										onClick={() => setShowDatePicker(false)}
										className="text-white rounded-lg cursor-pointer bg-[#008236] px-3 py-1.5"
									>
										Done
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex gap-2 bg-[#ECECF0] rounded-full p-1 w-fit">
				<button
					onClick={() => setHistorySource("recent")}
					className={`cursor-pointer px-4 py-2 rounded-full text-sm ${
						historySource === "recent" ? "bg-white shadow-sm" : ""
					}`}
				>
					Recent (6)
				</button>
				<button
					onClick={() => setHistorySource("all")}
					className={`cursor-pointer px-4 py-2 rounded-full text-sm ${
						historySource === "all" ? "bg-white shadow-sm" : ""
					}`}
				>
					All Notifications
				</button>
			</div>
			<div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
				<NotificationsTable data={displayList} />
			</div>
		</div>
	);
}
