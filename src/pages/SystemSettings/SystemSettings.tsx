import General from "@/components/SystemSettings/General";
import PlatformTools from "@/components/SystemSettings/PlatformTools";
import SettingsForm from "@/components/SystemSettings/SettingsForm/SettingsForm";

export default function SystemSettings() {
	return (
		<div className="space-y-6">
			<div className="mb-10 flex items-center justify-between overflow-auto ">
				<div className="space-y-1">
					<h1 className="text-xl sm:text-2xl  text-[#101828]">
						System Settings
					</h1>
					<p className="text-[#4A5565] text-sm sm:text-base">
						Configure platform-wide settings and preferences
					</p>
				</div>
			</div>
			<General />
			<SettingsForm/>
			<PlatformTools />
		</div>
	);
}
