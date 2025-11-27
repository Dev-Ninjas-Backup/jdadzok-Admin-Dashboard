import { useGetMyReportsQuery } from "@/redux/features/reports/reportsApi";
import ReportItem from "./ReportItem";


const RecentReports: React.FC = () => {
  const { data } = useGetMyReportsQuery(null);

  return (
    <div className="mx-auto p-3 lg:p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {data?.data?.map((report: any) => (
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
    </div>
  );
};

export default RecentReports;
