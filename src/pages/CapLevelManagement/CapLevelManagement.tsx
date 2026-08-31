import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useApproveSkyBlueMutation,
  useGetPendingBlackReviewQuery,
  useGetSkyBlueNominationsQuery,
  useNominateSkyBlueMutation,
  usePromoteCapLevelMutation,
  useRejectSkyBlueMutation,
  useRevokeSkyBlueMutation,
  useVerifySkyBlueKycMutation,
  useVerifySkyBlueNotabilityMutation,
} from "@/redux/features/capLevel/capLevelApi";
import { Award, CheckCircle, Clock, UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Tab = "black-review" | "sky-blue";

export default function CapLevelManagement() {
  const [activeTab, setActiveTab] = useState<Tab>("black-review");
  const [skyBlueStatus, setSkyBlueStatus] = useState("");
  const [nomineeUserId, setNomineeUserId] = useState("");
  const [showNominate, setShowNominate] = useState(false);

  const { data: pendingBlack = [], isLoading: loadingBlack } =
    useGetPendingBlackReviewQuery(undefined);
  const { data: nominations = [], isLoading: loadingSkyBlue } =
    useGetSkyBlueNominationsQuery(skyBlueStatus || undefined);

  const [promoteCap] = usePromoteCapLevelMutation();
  const [nominate] = useNominateSkyBlueMutation();
  const [verifyKyc] = useVerifySkyBlueKycMutation();
  const [verifyNotability] = useVerifySkyBlueNotabilityMutation();
  const [approveSkyBlue] = useApproveSkyBlueMutation();
  const [rejectSkyBlue] = useRejectSkyBlueMutation();
  const [revokeSkyBlue] = useRevokeSkyBlueMutation();

  const blackList = Array.isArray(pendingBlack) ? pendingBlack : [];
  const skyBlueList = Array.isArray(nominations) ? nominations : [];

  const handlePromoteToBlack = async (userId: string) => {
    try {
      await promoteCap({ userId, targetLevel: "BLACK" }).unwrap();
      toast.success("Member promoted to Black Cap");
    } catch {
      toast.error("Promotion failed");
    }
  };

  const handleNominate = async () => {
    if (!nomineeUserId.trim()) return;
    try {
      await nominate({ nomineeId: nomineeUserId.trim() }).unwrap();
      toast.success("Sky Blue nomination created");
      setNomineeUserId("");
      setShowNominate(false);
    } catch {
      toast.error("Nomination failed");
    }
  };

  const stats = [
    {
      title: "Pending Black Review",
      value: String(blackList.length),
      leftIcon: <Clock size={20} />,
      leftIconColor: "#F54900",
    },
    {
      title: "Sky Blue Nominations",
      value: String(skyBlueList.length),
      leftIcon: <Award size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Awaiting KYC",
      value: String(
        skyBlueList.filter((n: { kycVerifiedAt?: string }) => !n.kycVerifiedAt)
          .length
      ),
      leftIcon: <UserPlus size={20} />,
      leftIconColor: "#9810FA",
    },
    {
      title: "Approved Sky Blue",
      value: String(
        skyBlueList.filter((n: { status: string }) => n.status === "APPROVED")
          .length
      ),
      leftIcon: <CheckCircle size={20} />,
      leftIconColor: "#00A63E",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 space-y-1">
        <h1 className="text-xl sm:text-2xl text-[#101828]">
          Cap Level & Sky Blue
        </h1>
        <p className="text-[#4A5565] text-sm sm:text-base">
          Manage Red→Black promotions and Sky Blue invitation track
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 bg-[#ECECF0] rounded-full p-1 w-fit">
        {[
          { id: "black-review" as Tab, label: "Black Cap Review" },
          { id: "sky-blue" as Tab, label: "Sky Blue Nominations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#0A0A0A] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "black-review" && (
        <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
          {loadingBlack ? (
            <p className="p-6 text-gray-500">Loading...</p>
          ) : blackList.length === 0 ? (
            <p className="p-6 text-gray-500">
              No Red Cap members awaiting Black promotion review.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {blackList.map(
                (user: {
                  id: string;
                  email: string;
                  capLevel: string;
                  profile?: { name?: string };
                  metrics?: {
                    lifetimeVerifiedVolunteerHours?: number;
                    activityScore?: number;
                  };
                }) => (
                  <div
                    key={user.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <p className="font-medium text-[#101828]">
                        {user.profile?.name || user.email}
                      </p>
                      <p className="text-sm text-[#6A7282]">{user.email}</p>
                      <p className="text-xs text-[#4A5565] mt-1">
                        Cap: {user.capLevel} · Hours:{" "}
                        {user.metrics?.lifetimeVerifiedVolunteerHours ?? 0} ·
                        Score: {user.metrics?.activityScore ?? 0}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePromoteToBlack(user.id)}
                      className="cursor-pointer px-4 py-2 bg-[#030213] text-white rounded-lg text-sm hover:bg-gray-800"
                    >
                      Promote to Black
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "sky-blue" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <select
              value={skyBlueStatus}
              onChange={(e) => setSkyBlueStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="KYC_VERIFIED">KYC Verified</option>
              <option value="NOTABILITY_VERIFIED">Notability Verified</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="REVOKED">Revoked</option>
            </select>
            <button
              onClick={() => setShowNominate(!showNominate)}
              className="cursor-pointer px-4 py-2 bg-[#030213] text-white rounded-lg text-sm"
            >
              Nominate Member
            </button>
          </div>

          {showNominate && (
            <div className="bg-white border rounded-xl p-4 flex gap-3">
              <input
                type="text"
                placeholder="Nominee user ID"
                value={nomineeUserId}
                onChange={(e) => setNomineeUserId(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <button
                onClick={handleNominate}
                className="cursor-pointer px-4 py-2 bg-[#1447E6] text-white rounded-lg text-sm"
              >
                Submit
              </button>
            </div>
          )}

          <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
            {loadingSkyBlue ? (
              <p className="p-6 text-gray-500">Loading...</p>
            ) : skyBlueList.length === 0 ? (
              <p className="p-6 text-gray-500">No Sky Blue nominations found.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {skyBlueList.map(
                  (nom: {
                    id: string;
                    status: string;
                    kycVerifiedAt?: string;
                    notabilityVerifiedAt?: string;
                    nominee?: {
                      email?: string;
                      profile?: { name?: string };
                    };
                  }) => (
                    <div key={nom.id} className="p-4 space-y-3">
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <p className="font-medium">
                            {nom.nominee?.profile?.name || nom.nominee?.email}
                          </p>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {nom.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {!nom.kycVerifiedAt && (
                            <button
                              onClick={async () => {
                                try {
                                  await verifyKyc({
                                    id: nom.id,
                                    verified: true,
                                    notes: "Admin verified",
                                  }).unwrap();
                                  toast.success("KYC recorded");
                                } catch {
                                  toast.error("KYC update failed");
                                }
                              }}
                              className="text-xs px-3 py-1.5 border rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                              Verify KYC
                            </button>
                          )}
                          {!nom.notabilityVerifiedAt && nom.kycVerifiedAt && (
                            <button
                              onClick={async () => {
                                try {
                                  await verifyNotability({
                                    id: nom.id,
                                    verified: true,
                                    notes: "Admin verified",
                                  }).unwrap();
                                  toast.success("Notability recorded");
                                } catch {
                                  toast.error("Notability update failed");
                                }
                              }}
                              className="text-xs px-3 py-1.5 border rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                              Verify Notability
                            </button>
                          )}
                          {nom.status !== "APPROVED" &&
                            nom.kycVerifiedAt &&
                            nom.notabilityVerifiedAt && (
                              <button
                                onClick={async () => {
                                  try {
                                    await approveSkyBlue({
                                      id: nom.id,
                                      notes: "Approved by admin",
                                    }).unwrap();
                                    toast.success("Sky Blue approved");
                                  } catch {
                                    toast.error("Approval failed");
                                  }
                                }}
                                className="text-xs px-3 py-1.5 bg-[#008236] text-white rounded-lg cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                          {nom.status !== "REJECTED" &&
                            nom.status !== "APPROVED" && (
                              <button
                                onClick={async () => {
                                  try {
                                    await rejectSkyBlue({
                                      id: nom.id,
                                      notes: "Rejected by admin",
                                    }).unwrap();
                                    toast.success("Nomination rejected");
                                  } catch {
                                    toast.error("Rejection failed");
                                  }
                                }}
                                className="text-xs px-3 py-1.5 text-red-600 border border-red-200 rounded-lg cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                          {nom.status === "APPROVED" && (
                            <button
                              onClick={async () => {
                                try {
                                  await revokeSkyBlue({
                                    id: nom.id,
                                    notes: "Revoked by admin",
                                  }).unwrap();
                                  toast.success("Sky Blue revoked");
                                } catch {
                                  toast.error("Revoke failed");
                                }
                              }}
                              className="text-xs px-3 py-1.5 text-red-700 bg-red-50 border border-red-200 rounded-lg cursor-pointer"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
