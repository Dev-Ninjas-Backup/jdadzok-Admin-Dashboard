import { DollarSign } from "lucide-react";
import { useState } from "react";

export default function Financial() {
	const [currency, setCurrency] = useState("");
	const [payment, setPayment] = useState("");
	const [stripeKey, setStripeKey] = useState("sk_test_••••••••••••••••");
	const [maxEvents, setMaxEvents] = useState("10");
	const [maxPosts, setMaxPosts] = useState("5");
	const [backupMode, setBackupMode] = useState(false);

	return (
		<div className="space-y-6">
			<div className="w-full  mx-auto bg-white rounded-xl border border-[#0000001a] p-6">
				{/* Header */}
				<div className="flex items-center gap-3 mb-12">
					<DollarSign size={20} className="text-[#00A63E]" />

					<div className="space-y-1.5">
						<h2 className="text-base font-medium text-[#101828]">
							Financial Settings
						</h2>
						<p className="text-sm text-[#4A5565] ">
							Configure commission rates and payment settings
						</p>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Platform Commission (%)
						</label>
						<input
							type="number"
							value={maxEvents}
							onChange={(e) => setMaxEvents(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
						<label className="block text-sm font-medium text-[#6A7282] mb-3 mt-1.5">
							Percentage taken from marketplace sales
						</label>
					</div>

					{/* Max Posts Per Day */}
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Minimum Payout Amount ($)
						</label>
						<input
							type="number"
							value={maxPosts}
							onChange={(e) => setMaxPosts(e.target.value)}
							className="w-full px-4 py-2 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Currency
						</label>
						<input
							type="text"
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
							className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
					<div className="border-b border-[#0000001a]" />

					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Payment Gateway
						</label>
						<input
							type="text"
							value={payment}
							onChange={(e) => setPayment(e.target.value)}
							className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-[#364153] mb-2">
							Stripe API Key
						</label>
						<input
							type="url"
							value={stripeKey}
							onChange={(e) => setStripeKey(e.target.value)}
							className="w-full px-4 py-3 bg-[#F3F3F5] border-0 rounded-lg text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-gray-200"
						/>
					</div>
					<div>
						<div className="flex items-center justify-between gap-2">
							<div>
								<label className="block text-sm font-medium text-[#101828]">
									Auto-approve Payouts
								</label>
								<p className="text-sm text-[#4A5565] mt-0.5 ">
									Automatically process verified seller payouts
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
				</div>
			</div>
		</div>
	);
}
