"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PendingApprovals } from "./PendingApprovals";

const activityData = [
  { name: "Events", value: 35, color: "#3b82f6" },
  { name: "Marketplace", value: 45, color: "#10b981" },
  { name: "Donations", value: 20, color: "#f59e0b" },
];


export function ActivityDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[35%_63%]">
      {/* Activity Distribution Card */}
      <div className="rounded-lg border border-gray-300 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Activity Distribution
        </h2>

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
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-900">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Pending Approvals */}
      <PendingApprovals />
    </div>
  );
}
