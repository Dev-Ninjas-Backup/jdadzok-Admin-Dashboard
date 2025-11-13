"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { AlertCircle } from "lucide-react"

const activityData = [
  { name: "Events", value: 35, color: "#3b82f6" },
  { name: "Marketplace", value: 45, color: "#10b981" },
  { name: "Donations", value: 20, color: "#f59e0b" },
]

const pendingApprovals = [
  {
    id: 1,
    category: "Community Verification",
    title: "Green Earth Foundation",
    time: "2 hours ago",
  },
  {
    id: 2,
    category: "Event Approval",
    title: "Beach Cleanup Drive",
    time: "5 hours ago",
  },
  {
    id: 3,
    category: "Product Listing",
    title: "Eco-Friendly Water Bottle",
    time: "1 day ago",
  },
  {
    id: 4,
    category: "Payout Request",
    title: "Ocean Warriors NGO",
    time: "1 day ago",
  },
]

export function ActivityDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Activity Distribution Card */}
      <div className="rounded-lg border border-gray-300 bg-card p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-6">Activity Distribution</h2>

        <div className="flex flex-col items-center">
          {/* Donut Chart */}
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-8 w-full space-y-3">
            {activityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-card-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-card-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals Card */}
      <div className="rounded-lg border border-gray-300 bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold text-card-foreground">Pending Approvals</h2>
            <span className="ml-2 text-sm font-medium text-muted-foreground">{pendingApprovals.length}</span>
          </div>
          <a href="#" className="text-sm text-card-foreground hover:text-foreground transition-colors">
            View All
          </a>
        </div>

        {/* Approval Items */}
        <div className="space-y-4">
          {pendingApprovals.map((approval, index) => (
            <div
              key={approval.id}
              className={`flex items-center justify-between py-4 ${
                index !== pendingApprovals.length - 1 ? "border-b border-gray-300" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-muted px-2 py-1 rounded text-xs font-medium text-card-foreground">
                    {approval.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-card-foreground">{approval.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{approval.time}</p>
              </div>
              <button className="ml-4 px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted rounded transition-colors">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
