import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useClearFraudCheckMutation,
  useGetFraudChecksQuery,
  useGetFraudStatusQuery,
} from "@/redux/features/fraud/fraudApi";
import { AlertTriangle, CheckCircle, Shield, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FraudReview() {
  const [decision, setDecision] = useState("");
  const [page, setPage] = useState(1);

  const { data: status } = useGetFraudStatusQuery(undefined);
  const { data: checksData, isLoading } = useGetFraudChecksQuery({
    decision: decision || undefined,
    page,
    limit: 20,
  });
  const [clearCheck] = useClearFraudCheckMutation();

  const checks = checksData?.items ?? checksData?.rows ?? checksData?.data ?? [];
  const total = checksData?.total ?? 0;

  const handleClear = async (id: string) => {
    try {
      await clearCheck(id).unwrap();
      toast.success("Fraud check cleared");
    } catch {
      toast.error("Failed to clear check");
    }
  };

  const stats = [
    {
      title: "Vendor",
      value: status?.provider ?? "—",
      leftIcon: <Shield size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Enabled",
      value: status?.enabled ? "Yes" : "No",
      leftIcon: <CheckCircle size={20} />,
      leftIconColor: status?.enabled ? "#00A63E" : "#E7000B",
    },
    {
      title: "Queue Threshold",
      value: String(status?.queueScore ?? "—"),
      leftIcon: <AlertTriangle size={20} />,
      leftIconColor: "#F54900",
    },
    {
      title: "Total Checks",
      value: String(total),
      leftIcon: <XCircle size={20} />,
      leftIconColor: "#9810FA",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 space-y-1">
        <h1 className="text-xl sm:text-2xl text-[#101828]">Fraud Review</h1>
        <p className="text-[#4A5565] text-sm sm:text-base">
          Review fraud vendor flags from onboarding and payout events
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <select
        value={decision}
        onChange={(e) => {
          setDecision(e.target.value);
          setPage(1);
        }}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
      >
        <option value="">All decisions</option>
        <option value="ALLOW">Allow</option>
        <option value="REVIEW">Review</option>
        <option value="REJECT">Reject</option>
      </select>

      <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : checks.length === 0 ? (
          <p className="p-6 text-gray-500">No fraud checks in queue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-[#6A7282]">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Decision</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {checks.map(
                  (check: {
                    id: string;
                    eventType: string;
                    score: number;
                    decision: string;
                    createdAt: string;
                    clearedAt?: string;
                    user?: { email?: string; capLevel?: string };
                  }) => (
                    <tr key={check.id}>
                      <td className="px-4 py-3">
                        <p>{check.user?.email ?? "—"}</p>
                        <p className="text-xs text-gray-500">
                          {check.user?.capLevel}
                        </p>
                      </td>
                      <td className="px-4 py-3">{check.eventType}</td>
                      <td className="px-4 py-3">{check.score}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            check.decision === "REJECT"
                              ? "bg-red-100 text-red-700"
                              : check.decision === "REVIEW"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {check.decision}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(check.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {!check.clearedAt && (
                          <button
                            onClick={() => handleClear(check.id)}
                            className="cursor-pointer text-xs px-3 py-1.5 border rounded-lg hover:bg-gray-50"
                          >
                            Clear
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > 20 && (
        <div className="flex gap-2 justify-end">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <button
            disabled={page * 20 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
