import { useState } from "react";
import { useGetMyReportsQuery } from "@/redux/features/reports/reportsApi";
import ReportItem from "./ReportItem";

const RecentReports: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMyReportsQuery(page);

  const meta = data?.data?.meta;
  console.log(meta)

  return (
    <div className="mx-auto p-3 lg:p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {data?.data?.data?.map((report: any) => (
          <ReportItem
            key={report.id}
            id={report.id}
            reason={report.reason}
            createdAt={report.createdAt}
            reporter={report.reporter}
            status={report.status}
          />
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-end gap-4 mt-5">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded text-sm font-medium ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
            disabled={page === meta.totalPages}
            className={`px-4 py-2 rounded text-sm font-medium ${
              page === meta.totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentReports;
