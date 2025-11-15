"use client";

import DashboardHeader from "@/components/common/DashboardHeader";
import { ActivityDashboard } from "@/components/Dashboard/ActivityDashboard";
import RecentReports from "@/components/Dashboard/RecentReports";
// import { ActivityDashboard } from "@/"

// import { RecentReports } from "@/components/RecentReports"
import {
  Users,
  Building2,
  Calendar,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
// import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userGrowthData = [
  { month: "Jan", users: 1000 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 2400 },
  { month: "Apr", users: 3100 },
  { month: "May", users: 4200 },
  { month: "Jun", users: 5200 },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 23000 },
  { month: "Apr", revenue: 32000 },
  { month: "May", revenue: 41000 },
  { month: "Jun", revenue: 55000 },
];

export default function DashboardOverview() {
  const stats = [
    {
      label: "Total Users",
      value: "5,342",
      change: "+12% from last month",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Verified Communities",
      value: "287",
      change: "+8 new this week",
      icon: Building2,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Events",
      value: "145",
      change: "23 happening today",
      icon: Calendar,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Marketplace Revenue",
      value: "$53,240",
      change: "+18% from last month",
      icon: ShoppingBag,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <main>
      {/* Header Section */}

      <div>
        <DashboardHeader
          title="Dashboard Overview"
          subtitle="Welcome back! Here's what's happening on your platform."
          buttonLabel="Download Report"
          onButtonClick={() => console.log("Download clicked")}
        />
      </div>

      {/* Stats Grid */}
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p className="text-green-600 text-sm font-medium mt-2">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`${stat.iconColor} w-6 h-6`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  User Growth
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Monthly active users
                </p>
              </div>
              <TrendingUp className="text-green-500 w-5 h-5" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  dot={{ fill: "#3b82f6", r: 4 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trends Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue Trends
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Monthly revenue in USD
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-8 py-8">
        <ActivityDashboard />
        <RecentReports />
      </div>
    </main>
  );
}
