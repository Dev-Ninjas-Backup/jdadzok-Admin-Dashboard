import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useBatchRecalculateMutation,
  useGetActivityLeaderboardQuery,
  useGetPlatformStatsQuery,
  useGetUserMetricsQuery,
  useRecalculateUserScoreMutation,
} from "@/redux/features/userMetrics/userMetricsApi";
import { useGetCapAuditQuery } from "@/redux/features/capLevel/capLevelApi";
import { BarChart3, RefreshCw, Search, Trophy, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PlatformAnalytics() {
  const [userId, setUserId] = useState("");
  const [lookupId, setLookupId] = useState("");

  const { data: platformStats } = useGetPlatformStatsQuery(undefined);
  const { data: leaderboard = [] } = useGetActivityLeaderboardQuery({
    limit: 10,
  });
  const { data: userMetrics } = useGetUserMetricsQuery(lookupId, {
    skip: !lookupId,
  });
  const { data: capAudit } = useGetCapAuditQuery(lookupId, {
    skip: !lookupId,
  });

  const [recalculate] = useRecalculateUserScoreMutation();
  const [batchRecalculate, { isLoading: batchLoading }] =
    useBatchRecalculateMutation();

  const stats = platformStats as Record<string, number> | undefined;
  const leaders = Array.isArray(leaderboard) ? leaderboard : [];

  const handleLookup = () => {
    if (userId.trim()) setLookupId(userId.trim());
  };

  const handleRecalculate = async () => {
    if (!lookupId) return;
    try {
      await recalculate(lookupId).unwrap();
      toast.success("Score recalculated");
    } catch {
      toast.error("Recalculation failed");
    }
  };

  const handleBatchRecalculate = async () => {
    try {
      await batchRecalculate({ adminId: "admin", batchSize: 50 }).unwrap();
      toast.success("Batch recalculation started");
    } catch {
      toast.error("Batch recalculation failed");
    }
  };

  const statCards = [
    {
      title: "Active Users",
      value: String(stats?.activeUsers ?? "—"),
      leftIcon: <Users size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Avg Activity Score",
      value: String(stats?.averageActivityScore ?? "—"),
      leftIcon: <BarChart3 size={20} />,
      leftIconColor: "#00A63E",
    },
    {
      title: "Highest Score",
      value: String(stats?.highestActivityScore ?? "—"),
      leftIcon: <Trophy size={20} />,
      leftIconColor: "#F54900",
    },
    {
      title: "Volunteer Hours",
      value: String(stats?.totalVolunteerHours ?? "—"),
      leftIcon: <RefreshCw size={20} />,
      leftIconColor: "#9810FA",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl text-[#101828]">
            Platform Analytics
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base">
            User metrics, activity leaderboard, and cap audit tools
          </p>
        </div>
        <button
          onClick={handleBatchRecalculate}
          disabled={batchLoading}
          className="cursor-pointer px-4 py-2 bg-[#030213] text-white rounded-lg text-sm disabled:opacity-50"
        >
          {batchLoading ? "Running..." : "Batch Recalculate Scores"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <div className="bg-white border rounded-xl p-4 flex gap-3">
        <Search size={18} className="text-gray-400 self-center" />
        <input
          type="text"
          placeholder="Enter user ID to lookup metrics & cap audit"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 text-sm outline-none"
        />
        <button
          onClick={handleLookup}
          className="cursor-pointer px-4 py-2 bg-[#1447E6] text-white rounded-lg text-sm"
        >
          Lookup
        </button>
      </div>

      {lookupId && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white border rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">User Metrics</h2>
              <button
                onClick={handleRecalculate}
                className="text-xs px-3 py-1.5 border rounded-lg cursor-pointer"
              >
                Recalculate Score
              </button>
            </div>
            <pre className="text-xs overflow-auto whitespace-pre-wrap text-[#364153]">
              {JSON.stringify(userMetrics, null, 2)}
            </pre>
          </div>
          <div className="bg-white border rounded-xl p-6 space-y-3">
            <h2 className="font-medium">Cap Promotion Audit</h2>
            <pre className="text-xs overflow-auto whitespace-pre-wrap text-[#364153]">
              {JSON.stringify(capAudit, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
        <h2 className="px-6 pt-6 pb-2 font-medium text-[#101828]">
          Activity Leaderboard
        </h2>
        {leaders.length === 0 ? (
          <p className="p-6 text-gray-500">No leaderboard data.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-[#6A7282]">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Cap</th>
                <th className="px-4 py-3">Posts</th>
                <th className="px-4 py-3">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaders.map(
                (entry: {
                  rank: number;
                  userId: string;
                  displayName?: string;
                  activityScore: number;
                  capLevel?: string;
                  totalPosts?: number;
                  volunteerHours?: number;
                }) => (
                  <tr key={entry.userId}>
                    <td className="px-4 py-3">#{entry.rank}</td>
                    <td className="px-4 py-3">
                      {entry.displayName || entry.userId.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">{entry.activityScore}</td>
                    <td className="px-4 py-3">{entry.capLevel}</td>
                    <td className="px-4 py-3">{entry.totalPosts ?? 0}</td>
                    <td className="px-4 py-3">{entry.volunteerHours ?? 0}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
