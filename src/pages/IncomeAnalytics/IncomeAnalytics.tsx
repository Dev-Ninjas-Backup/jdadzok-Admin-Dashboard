import DashboardHeader from "@/components/common/DashboardHeader";
import { DashboardCharts } from "@/components/IncomeAnalytics/IncomeChart";
import { TopSellers } from "@/components/IncomeAnalytics/TopSellers";
import { Users, Building2, Calendar, ShoppingBag } from "lucide-react";
// import { Button } from "@/components/ui/button"
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function IncomeAnalytics() {
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
          title="	Income & Analytics"
          subtitle="	Monitor revenue, commissions, and financial performance."
          buttonLabel="Download Financial Report"
          onButtonClick={() => console.log("Download clicked")}
        />
      </div>

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
      <div className="space-y-8">
        <DashboardCharts />
        <TopSellers />
      </div>
    </main>
  );
}
