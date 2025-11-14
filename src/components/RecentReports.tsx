const reportsData = [
  {
    id: 1,
    title: "Spam Content",
    userId: "#1234",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: 2,
    title: "Inappropriate Post",
    userId: "#5678",
    time: "3 hours ago",
    status: "reviewing",
  },
  {
    id: 3,
    title: "Fake Product",
    userId: "#9012",
    time: "6 hours ago",
    status: "pending",
  },
]

export function RecentReports() {
  return (
    <div className="rounded-lg border border-gray-300 bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">Recent Reports</h2>
        <a href="#" className="text-sm text-card-foreground hover:text-foreground transition-colors">
          View All Reports
        </a>
      </div>

      {/* Reports List */}
      <div className="space-y-0">
        {reportsData.map((report, index) => (
          <div
            key={report.id}
            className={`flex items-center justify-between px-4 py-4 ${
              index !== reportsData.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-semibold text-card-foreground">{report.title}</p>
                <span className="text-xs text-muted-foreground">by User</span>
                <span className="text-xs text-muted-foreground font-medium">{report.userId}</span>
              </div>
              <p className="text-xs text-muted-foreground">{report.time}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block bg-muted px-2 py-1 rounded text-xs font-medium text-card-foreground capitalize">
                  {report.status}
                </span>
              </div>
            </div>
            <button className="ml-4 px-6 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded transition-colors">
              Investigate
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
