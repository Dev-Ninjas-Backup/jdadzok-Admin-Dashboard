import CardWithoutIcon from "@/components/common/CardWithoutIcon";
import {
  useCreateCorporateMembershipMutation,
  useGetCorporateMembershipsQuery,
  useGetCorporateTiersQuery,
  useUpdateCorporateMembershipMutation,
  useUpdateCorporateEsgMutation,
} from "@/redux/features/corporate/corporateApi";
import { Building2, Plus, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CorporateCSR() {
  const { data: memberships = [], isLoading } =
    useGetCorporateMembershipsQuery(undefined);
  const { data: tiers = [] } = useGetCorporateTiersQuery(undefined);
  const [createMembership] = useCreateCorporateMembershipMutation();
  const [updateMembership] = useUpdateCorporateMembershipMutation();
  const [updateEsg] = useUpdateCorporateEsgMutation();
  const [editingEsgId, setEditingEsgId] = useState<string | null>(null);
  const [esgForm, setEsgForm] = useState({
    esgReportPeriod: "",
    sdgImpactSummary: "",
    reportedVolunteerHours: "",
    esgReportUrl: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactEmail: "",
    tier: "STARTER",
  });

  const list = Array.isArray(memberships) ? memberships : [];

  const handleCreate = async () => {
    if (!form.companyName || !form.contactEmail) {
      toast.error("Company name and email are required");
      return;
    }
    try {
      await createMembership(form).unwrap();
      toast.success("Corporate membership created");
      setForm({ companyName: "", contactEmail: "", tier: "STARTER" });
      setShowForm(false);
    } catch {
      toast.error("Failed to create membership");
    }
  };

  const handleTierChange = async (id: string, tier: string) => {
    try {
      await updateMembership({ id, tier }).unwrap();
      toast.success("Tier updated");
    } catch {
      toast.error("Failed to update tier");
    }
  };

  const openEsgEdit = (m: {
    id: string;
    esgReportPeriod?: string;
    sdgImpactSummary?: string;
    reportedVolunteerHours?: number;
    esgReportUrl?: string;
  }) => {
    setEditingEsgId(m.id);
    setEsgForm({
      esgReportPeriod: m.esgReportPeriod || "",
      sdgImpactSummary: m.sdgImpactSummary || "",
      reportedVolunteerHours: String(m.reportedVolunteerHours ?? ""),
      esgReportUrl: m.esgReportUrl || "",
    });
  };

  const handleEsgSave = async () => {
    if (!editingEsgId) return;
    try {
      await updateEsg({
        id: editingEsgId,
        esgReportPeriod: esgForm.esgReportPeriod || undefined,
        sdgImpactSummary: esgForm.sdgImpactSummary || undefined,
        reportedVolunteerHours: esgForm.reportedVolunteerHours
          ? Number(esgForm.reportedVolunteerHours)
          : undefined,
        esgReportUrl: esgForm.esgReportUrl || undefined,
      }).unwrap();
      toast.success("ESG report updated");
      setEditingEsgId(null);
    } catch {
      toast.error("Failed to update ESG report");
    }
  };

  const tierList = Array.isArray(tiers) ? tiers : [];

  const stats = [
    {
      title: "Total Memberships",
      value: String(list.length),
      leftIcon: <Building2 size={20} />,
      leftIconColor: "#155DFC",
    },
    {
      title: "Active",
      value: String(list.filter((m: { isActive?: boolean }) => m.isActive !== false).length),
      leftIcon: <Users size={20} />,
      leftIconColor: "#00A63E",
    },
    {
      title: "Enterprise",
      value: String(
        list.filter((m: { tier: string }) => m.tier === "ENTERPRISE").length
      ),
      leftIcon: <Building2 size={20} />,
      leftIconColor: "#9810FA",
    },
    {
      title: "Available Tiers",
      value: String(tierList.length || 3),
      leftIcon: <Plus size={20} />,
      leftIconColor: "#F54900",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl text-[#101828]">Corporate CSR</h1>
          <p className="text-[#4A5565] text-sm sm:text-base">
            Manage corporate tiers, ESG reporting, and sponsorship memberships
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="cursor-pointer bg-[#030213] text-white rounded-lg px-4 py-2 text-sm"
        >
          Add Membership
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardWithoutIcon key={index} {...stat} gapX={12} gap={6} />
        ))}
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-medium text-[#101828]">New Corporate Membership</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              placeholder="Company name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <input
              placeholder="Contact email"
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="STARTER">Starter</option>
              <option value="GROWTH">Growth</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
          <button
            onClick={handleCreate}
            className="cursor-pointer px-4 py-2 bg-[#1447E6] text-white rounded-lg text-sm"
          >
            Create
          </button>
        </div>
      )}

      <div className="bg-white border border-[#0000001a] rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : list.length === 0 ? (
          <p className="p-6 text-gray-500">No corporate memberships yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-[#6A7282]">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">ESG Period</th>
                  <th className="px-4 py-3">Volunteer Hours</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map(
                  (m: {
                    id: string;
                    companyName: string;
                    contactEmail: string;
                    tier: string;
                    esgReportPeriod?: string;
                    reportedVolunteerHours?: number;
                    sdgImpactSummary?: string;
                    esgReportUrl?: string;
                    isActive?: boolean;
                  }) => (
                    <tr key={m.id}>
                      <td className="px-4 py-3 font-medium">{m.companyName}</td>
                      <td className="px-4 py-3">{m.contactEmail}</td>
                      <td className="px-4 py-3">
                        <select
                          value={m.tier}
                          onChange={(e) =>
                            handleTierChange(m.id, e.target.value)
                          }
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="STARTER">Starter</option>
                          <option value="GROWTH">Growth</option>
                          <option value="ENTERPRISE">Enterprise</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {m.esgReportPeriod || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {m.reportedVolunteerHours ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            m.isActive !== false
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {m.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openEsgEdit(m)}
                          className="text-xs px-3 py-1.5 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          Edit ESG
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingEsgId && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-medium">Edit ESG Report</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Report period (e.g. FY2026 Q2)"
              value={esgForm.esgReportPeriod}
              onChange={(e) =>
                setEsgForm({ ...esgForm, esgReportPeriod: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <input
              placeholder="Volunteer hours"
              type="number"
              value={esgForm.reportedVolunteerHours}
              onChange={(e) =>
                setEsgForm({
                  ...esgForm,
                  reportedVolunteerHours: e.target.value,
                })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />
            <input
              placeholder="ESG report URL"
              value={esgForm.esgReportUrl}
              onChange={(e) =>
                setEsgForm({ ...esgForm, esgReportUrl: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm sm:col-span-2"
            />
            <textarea
              placeholder="SDG impact summary"
              value={esgForm.sdgImpactSummary}
              onChange={(e) =>
                setEsgForm({ ...esgForm, sdgImpactSummary: e.target.value })
              }
              rows={3}
              className="px-3 py-2 border rounded-lg text-sm sm:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEsgSave}
              className="cursor-pointer px-4 py-2 bg-[#1447E6] text-white rounded-lg text-sm"
            >
              Save ESG
            </button>
            <button
              onClick={() => setEditingEsgId(null)}
              className="cursor-pointer px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
