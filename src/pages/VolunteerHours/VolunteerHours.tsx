import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useEndorseHoursMutation,
  useGetPendingEndorsementQuery,
  useRejectHoursMutation,
} from "@/redux/features/volunteer/volunteerApi";
import { CheckCircle, Clock, HandHeart, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VolunteerHours() {
  const { data: response, isLoading } = useGetPendingEndorsementQuery(undefined);
  const [endorseHours] = useEndorseHoursMutation();
  const [rejectHours] = useRejectHoursMutation();
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});

  const hours = response?.data ?? (Array.isArray(response) ? response : []);

  const handleEndorse = async (hourId: string) => {
    try {
      await endorseHours({ hourId, message: "Endorsed by admin" }).unwrap();
      toast.success("Hours endorsed");
    } catch {
      toast.error("Endorsement failed");
    }
  };

  const handleReject = async (hourId: string) => {
    try {
      await rejectHours({
        hourId,
        rejectionNote: rejectNote[hourId] || "Rejected by admin",
      }).unwrap();
      toast.success("Hours rejected");
    } catch {
      toast.error("Rejection failed");
    }
  };

  const stats = [
    {
      title: "Pending Endorsement",
      value: String(hours.length),
      leftIcon: <Clock size={20} />,
      leftIconColor: "#F54900",
    },
    {
      title: "Self-Reported",
      value: String(hours.length),
      leftIcon: <HandHeart size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Ready to Endorse",
      value: String(hours.length),
      leftIcon: <CheckCircle size={20} />,
      leftIconColor: "#00A63E",
    },
    {
      title: "Cap Impact",
      value: "Active",
      leftIcon: <XCircle size={20} />,
      leftIconColor: "#9810FA",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 space-y-1">
        <h1 className="text-xl sm:text-2xl text-[#101828]">
          Volunteer Hour Endorsement
        </h1>
        <p className="text-[#4A5565] text-sm sm:text-base">
          Review and endorse self-reported volunteer hours before they count toward Cap levels
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : hours.length === 0 ? (
          <p className="p-6 text-gray-500">
            No volunteer hours pending endorsement.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {hours.map(
              (hour: {
                id: string;
                hours: number;
                contributionType?: string;
                createdAt: string;
                loggedByUser?: {
                  profile?: { name?: string };
                  capLevel?: string;
                };
                application?: {
                  project?: { title?: string };
                };
              }) => (
                <div
                  key={hour.id}
                  className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-[#101828]">
                      {hour.loggedByUser?.profile?.name || "Unknown volunteer"}
                    </p>
                    <p className="text-sm text-[#6A7282]">
                      {hour.application?.project?.title || "Volunteer project"} ·{" "}
                      {hour.hours}h · {hour.contributionType || "General"}
                    </p>
                    <p className="text-xs text-[#4A5565] mt-1">
                      Cap: {hour.loggedByUser?.capLevel} ·{" "}
                      {new Date(hour.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Rejection note (optional)"
                      value={rejectNote[hour.id] || ""}
                      onChange={(e) =>
                        setRejectNote({ ...rejectNote, [hour.id]: e.target.value })
                      }
                      className="text-xs px-3 py-1.5 border rounded-lg w-40"
                    />
                    <button
                      onClick={() => handleEndorse(hour.id)}
                      className="cursor-pointer px-4 py-2 bg-[#008236] text-white rounded-lg text-sm"
                    >
                      Endorse
                    </button>
                    <button
                      onClick={() => handleReject(hour.id)}
                      className="cursor-pointer px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
