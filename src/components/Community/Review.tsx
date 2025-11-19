import { useReviewCommunitiesMutation } from "@/redux/features/communities/communitiesApi";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ReviewProps {
	setSimplePopup: (value: boolean) => void;
	roleOptions?: string[];
	id?: string; // you MUST pass ID from parent
}

const Review = ({
	setSimplePopup,
	roleOptions = ["APPROVED", "REJECTED", "PENDING"],
	id,
}: ReviewProps) => {
	const [status, setStatus] = useState(roleOptions[0]);
	const [remarks, setRemarks] = useState("");
	const [reviewCommunities] = useReviewCommunitiesMutation();
	console.log("id", id);
	const handleSubmit = async () => {
		try {
			await reviewCommunities({
				id,
				data: {
					status,
					remarks,
				},
			}).unwrap();

			setSimplePopup(false);
		} catch (error) {
			console.error("Failed to save:", error);
		}
	};

	return (
		<div className="p-6">
			<p className="text-[#4A5565] mb-1">Status</p>

			<div className="relative w-full sm:w-auto mb-4">
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="appearance-none w-full pl-4 pr-10 py-2.5 bg-[#F3F3F5] outline-none border-0 rounded-lg text-sm text-black cursor-pointer"
				>
					{roleOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				<ChevronDown
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
					size={16}
				/>
			</div>

			<p className="text-[#4A5565] mb-1">Description</p>
			<textarea
				rows={3}
				value={remarks}
				onChange={(e) => setRemarks(e.target.value)}
				placeholder="Description"
				className="w-full px-4 py-2.5 bg-[#F3F3F5] border-0 rounded-lg text-sm text-black outline-none"
			/>

			<div className="flex justify-end mt-4">
				<button
					onClick={handleSubmit}
					className="px-6 py-2 bg-[#00A63E] text-white rounded-lg hover:bg-white hover:text-[#00A63E] border border-[#00A63E]"
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Review;
