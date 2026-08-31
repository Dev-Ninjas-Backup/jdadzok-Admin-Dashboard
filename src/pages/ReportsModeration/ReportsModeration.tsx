import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useGetAdminReportsQuery,
  useReviewReportMutation,
  type AdminReport,
} from "@/redux/features/reports/reportsApi";
import { AlertTriangle, CheckCircle, Flag, Shield } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReportsModeration() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useGetAdminReportsQuery({ page, limit: 20 });
  const [reviewReport] = useReviewReportMutation();

  const reports = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, totalPages: 1, page: 1 };

  const filtered = statusFilter
    ? reports.filter((r: { status: string }) => r.status === statusFilter)
    : reports;

  const pendingCount = reports.filter(
    (r: { status: string }) => r.status === "PENDING"
  ).length;

  const handleReview = async (id: string, status: string) => {
    try {
      await reviewReport({ id, status }).unwrap();
      toast.success(`Report marked as ${status}`);
    } catch {
      toast.error("Failed to update report");
    }
  };

  const stats = [
    {
      title: "Total Reports",
      value: String(meta.total ?? 0),
      leftIcon: <Flag size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Pending",
      value: String(pendingCount),
      leftIcon: <AlertTriangle size={20} />,
      leftIconColor: "#F54900",
    },
    {
      title: "This Page",
      value: String(filtered.length),
      leftIcon: <Shield size={20} />,
      leftIconColor: "#9810FA",
    },
    {
      title: "Reviewed",
      value: String(
        reports.filter((r: { status: string }) => r.status === "REVIEWED").length
      ),
      leftIcon: <CheckCircle size={20} />,
      leftIconColor: "#00A63E",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 space-y-1">
        <h1 className="text-xl sm:text-2xl text-[#101828]">Reports Moderation</h1>
        <p className="text-[#4A5565] text-sm sm:text-base">
          Review user-submitted abuse reports across posts, profiles, and content
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
      >
        <option value="">All statuses</option>
        <option value="PENDING">Pending</option>
        <option value="REVIEWED">Reviewed</option>
        <option value="DISMISSED">Dismissed</option>
      </select>

      <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-gray-500">No reports found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((report: AdminReport) => (
                <div key={report.id} className="p-4 space-y-3">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="font-medium">{report.reason}</p>
                      <p className="text-sm text-[#6A7282]">
                        Target: {report.targetType} ·{" "}
                        {report.target?.name || report.target?.title || "—"}
                      </p>
                      <p className="text-xs text-[#4A5565]">
                        By{" "}
                        {report.reporter?.profile?.name ||
                          report.reporter?.profile?.username}{" "}
                        · {new Date(report.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full h-fit ${
                        report.status === "PENDING"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  {report.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReview(report.id, "REVIEWED")}
                        className="cursor-pointer text-xs px-3 py-1.5 bg-[#008236] text-white rounded-lg"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        onClick={() => handleReview(report.id, "DISMISSED")}
                        className="cursor-pointer text-xs px-3 py-1.5 border rounded-lg"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {meta.totalPages > 1 && (
        <div className="flex gap-2 justify-end">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500 self-center">
            Page {page} of {meta.totalPages}
          </span>
          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
