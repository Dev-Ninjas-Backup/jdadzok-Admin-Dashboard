import { useState } from "react";
import { useReviewReportMutation } from "@/redux/features/reports/reportsApi";
import toast from "react-hot-toast";

interface IReporter {
  id: string;
  profile: any | null;
}

interface IReportItemProps {
  id: string;
  reason: string;
  createdAt: string;
  reporter: IReporter;
  status: string;
}

const ReportItem: React.FC<IReportItemProps> = ({
  id,
  reason,
  createdAt,
  reporter,
  status,
}) => {
  const [reviewStatus, setReviewStatus] = useState(status); // 
  const [reviewReport, { isLoading }] = useReviewReportMutation();

  const handleReview = async () => {
    try {
      await reviewReport({
        id,
        adminNotes: "Reviewed and user warned for inappropriate behavior",
      }).unwrap();

      setReviewStatus("REVIEWED"); // 👈 instantly change UI
      toast.success("Report reviewed successfully!");
    } catch (error) {
      toast.error("Failed to review report");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between m-3 gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
        <div className="flex flex-col">
          <div className="text-base font-semibold text-gray-800">{reason}</div>
          <div className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleString()}{" "}
            <span className="text-gray-400">by</span> User #
            {reporter?.id?.slice(0, 8)}
          </div>
        </div>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            reviewStatus.toLowerCase() === "pending"
              ? "bg-gray-100 text-gray-700"
              : reviewStatus.toLowerCase() === "reviewed"
              ? "bg-gray-100  text-gray-800"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
          }`}
        >
          {reviewStatus.toLowerCase()}
        </span>
      </div>

      <button
        onClick={handleReview}
        disabled={isLoading || reviewStatus.toLowerCase() === "reviewed"}
        className={`text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 w-full sm:w-auto
          ${
            reviewStatus.toLowerCase() === "reviewed"
              ? "bg-green-600 cursor-not-allowed"
              : isLoading
              ? "bg-yellow-500 cursor-wait"
              : "bg-gray-800 hover:bg-gray-900 cursor-pointer"
          }
        `}
      >
        {isLoading
          ? "Reviewing..."
          : reviewStatus.toLowerCase() === "reviewed"
          ? "Reviewed"
          : "Investigate"}
      </button>
    </div>
  );
};

export default ReportItem;
