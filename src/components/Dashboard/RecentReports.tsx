// components/RecentReports.jsx



const reportsData = [
  {
    type: 'Spam Content',
    time: '1 hour ago',
    user: 'User #1234',
    status: 'pending',
  },
  {
    type: 'Inappropriate Post',
    time: '3 hours ago',
    user: 'User #5678',
    status: 'reviewing',
  },
  {
    type: 'Fake Product',
    time: '6 hours ago',
    user: 'User #9012',
    status: 'pending',
  },
];

const getStatusClasses = (status:any) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-700';
    case 'reviewing':
      return 'border border-gray-300 text-black';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const ReportItem = ({ type, time, user, status }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between m-3 gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white">
    
    {/* Report Info */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
      <div className="flex flex-col">
        <div className="text-base font-semibold text-gray-800">{type}</div>
        <div className="text-sm text-gray-500">
          {time} <span className="text-gray-400">by</span> {user}
        </div>
      </div>

      {/* Status Badge */}
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
          status
        )}`}
      >
        {status}
      </span>
    </div>

    {/* Investigate Button */}
    <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 w-full sm:w-auto">
      Investigate
    </button>
  </div>
);


const RecentReports = () => {
  return (
    <div className="mx-auto p-3 lg:p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-200 rounded-md transition duration-150">
          View All Reports
        </button>
      </div>

      <hr className="mb-4" />

      {/* Reports List */}
      <div className="divide-y divide-gray-100">
        {reportsData.map((report, index) => (
          <ReportItem 
            key={index}
            type={report.type}
            time={report.time}
            user={report.user}
            status={report.status}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentReports;