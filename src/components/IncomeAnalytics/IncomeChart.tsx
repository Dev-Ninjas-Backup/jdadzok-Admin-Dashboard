"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const revenueGrowthData = [
  { month: "Jan", revenue: 15000, commission: 1500 },
  { month: "Feb", revenue: 18000, commission: 1800 },
  { month: "Mar", revenue: 22000, commission: 2200 },
  { month: "Apr", revenue: 28000, commission: 2800 },
  { month: "May", revenue: 38000, commission: 3800 },
  { month: "Jun", revenue: 52000, commission: 5200 },
]

const categoryData = [
  { name: "Marketplace", value: 45, amount: 24210 },
  { name: "Events", value: 30, amount: 16140 },
  { name: "Donations", value: 15, amount: 8070 },
  { name: "Memberships", value: 10, amount: 5380 },
]

const performanceData = [
  { month: "Jan", revenue: 12000, commission: 1200 },
  { month: "Feb", revenue: 15000, commission: 1500 },
  { month: "Mar", revenue: 20000, commission: 2000 },
  { month: "Apr", revenue: 28000, commission: 2800 },
  { month: "May", revenue: 35000, commission: 3500 },
  { month: "Jun", revenue: 52000, commission: 5200 },
]

const COLORS = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"]

export function DashboardCharts() {
  return (
    <div className="w-full space-y-6">
      {/* Top Row: Revenue Growth and Revenue by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Revenue Growth</h3>
            <p className="text-sm text-gray-500">Monthly revenue and commission trends</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueGrowthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Category - Donut Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Revenue by Category</h3>
            <p className="text-sm text-gray-500">Distribution across revenue sources</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-48 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-4 ml-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index] }} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">${(category.amount / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 ml-2">{category.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Monthly Performance */}
      <div className="relative">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="absolute top-6 right-6">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">View Full Report</button>
          </div>
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Monthly Performance</h3>
            <p className="text-sm text-gray-500">Revenue comparison by month</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="commission" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}


// "use client"

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// const revenueGrowthData = [
//   { month: "Jan", revenue: 15000, commission: 1500 },
//   { month: "Feb", revenue: 18000, commission: 1800 },
//   { month: "Mar", revenue: 22000, commission: 2200 },
//   { month: "Apr", revenue: 28000, commission: 2800 },
//   { month: "May", revenue: 38000, commission: 3800 },
//   { month: "Jun", revenue: 52000, commission: 5200 },
// ]

// const categoryData = [
//   { name: "Marketplace", value: 45, amount: 24210 },
//   { name: "Events", value: 30, amount: 16140 },
//   { name: "Donations", value: 15, amount: 8070 },
//   { name: "Memberships", value: 10, amount: 5380 },
// ]

// const performanceData = [
//   { month: "Jan", revenue: 12000, commission: 1200 },
//   { month: "Feb", revenue: 15000, commission: 1500 },
//   { month: "Mar", revenue: 20000, commission: 2000 },
//   { month: "Apr", revenue: 28000, commission: 2800 },
//   { month: "May", revenue: 35000, commission: 3500 },
//   { month: "Jun", revenue: 52000, commission: 5200 },
// ]

// const COLORS = ["#3b82f6", "#10b981", "#a855f7", "#f59e0b"]

// export function DashboardCharts() {
//   return (
//     <div className="w-full space-y-6">
//       {/* Top Row: Revenue Growth and Revenue by Category */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Growth Chart */}
//         <Card className="bg-white border-gray-200">
//           <CardHeader>
//             <CardTitle className="text-base font-semibold text-gray-900">Revenue Growth</CardTitle>
//             <CardDescription className="text-sm text-gray-500">Monthly revenue and commission trends</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="w-full h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={revenueGrowthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
//                   <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
//                   <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#ffffff",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "6px",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#3b82f6"
//                     strokeWidth={2}
//                     dot={{ fill: "#3b82f6", r: 4 }}
//                     activeDot={{ r: 5 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="commission"
//                     stroke="#10b981"
//                     strokeWidth={2}
//                     dot={{ fill: "#10b981", r: 4 }}
//                     activeDot={{ r: 5 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Revenue by Category - Donut Chart */}
//         <Card className="bg-white border-gray-200">
//           <CardHeader>
//             <CardTitle className="text-base font-semibold text-gray-900">Revenue by Category</CardTitle>
//             <CardDescription className="text-sm text-gray-500">Distribution across revenue sources</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div className="w-48 h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={categoryData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {categoryData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Legend */}
//               <div className="flex-1 space-y-4 ml-4">
//                 {categoryData.map((category, index) => (
//                   <div key={category.name} className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index] }} />
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{category.name}</p>
//                         <p className="text-xs text-gray-500">${(category.amount / 1000).toFixed(0)}k</p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 ml-2">{category.value}%</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Bottom Row: Monthly Performance */}
//       <div className="relative">
//         <Card className="bg-white border-gray-200">
//           <div className="absolute top-4 right-6">
//             <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">View Full Report</button>
//           </div>
//           <CardHeader>
//             <CardTitle className="text-base font-semibold text-gray-900">Monthly Performance</CardTitle>
//             <CardDescription className="text-sm text-gray-500">Revenue comparison by month</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="w-full h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
//                   <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
//                   <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#ffffff",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "6px",
//                     }}
//                   />
//                   <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                   <Bar dataKey="commission" fill="#10b981" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
