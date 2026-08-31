import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useGetImpactBreakdownQuery,
  useGetImpactSummaryQuery,
} from "@/redux/features/impact/impactApi";
import { BarChart3, Globe, HandHeart, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ImpactReports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeTab, setActiveTab] = useState<"summary" | "breakdown">("summary");

  const queryParams = {
    ...(fromDate && { fromDate }),
    ...(toDate && { toDate }),
  };

  const { data: summary, isLoading: loadingSummary } =
    useGetImpactSummaryQuery(queryParams);
  const { data: breakdown, isLoading: loadingBreakdown } =
    useGetImpactBreakdownQuery(queryParams, { skip: activeTab !== "breakdown" });

  const summaryData = summary as Record<string, unknown> | undefined;
  const breakdownData = breakdown as Record<string, unknown> | undefined;

  const stats = [
    {
      title: "Verified Hours",
      value: String(summaryData?.totalVerifiedHours ?? "—"),
      leftIcon: <HandHeart size={20} />,
      leftIconColor: "#00A63E",
    },
    {
      title: "Active Volunteers",
      value: String(summaryData?.activeVolunteerCount ?? "—"),
      leftIcon: <Globe size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Projects",
      value: String(summaryData?.projectCount ?? "—"),
      leftIcon: <BarChart3 size={20} />,
      leftIconColor: "#9810FA",
    },
    {
      title: "Period",
      value: fromDate || toDate ? "Filtered" : "All time",
      leftIcon: <TrendingUp size={20} />,
      leftIconColor: "#F54900",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 space-y-1">
        <h1 className="text-xl sm:text-2xl text-[#101828]">Impact Reports</h1>
        <p className="text-[#4A5565] text-sm sm:text-base">
          Anonymised platform impact data for CSR and ESG reporting
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <div className="flex gap-2 bg-[#ECECF0] rounded-full p-1 w-fit">
        {(["summary", "breakdown"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium capitalize ${
              activeTab === tab
                ? "bg-white text-[#0A0A0A] shadow-sm"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#0000001a] rounded-xl p-6">
        {activeTab === "summary" ? (
          loadingSummary ? (
            <p className="text-gray-500">Loading summary...</p>
          ) : (
            <pre className="text-xs text-[#364153] overflow-auto whitespace-pre-wrap">
              {JSON.stringify(summaryData, null, 2)}
            </pre>
          )
        ) : loadingBreakdown ? (
          <p className="text-gray-500">Loading breakdown...</p>
        ) : (
          <pre className="text-xs text-[#364153] overflow-auto whitespace-pre-wrap">
            {JSON.stringify(breakdownData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
