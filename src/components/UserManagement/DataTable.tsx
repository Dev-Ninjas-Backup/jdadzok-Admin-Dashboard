import React, { useState, useEffect } from "react";
import {
  useActiveUserMutation,
  useSuspendUserMutation,
  useUpdateCaplevelMutation,
} from "@/redux/features/user/userApi";
import { TrendingUp, ChevronDown, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | string;
  level: string;
  points: number;
  joinedAt: string;
}

interface DataTableProps {
  data: User[];
}

// Helper function for level colors
const getLevelColor = (level: string) => {
  const colors = {
    GREEN: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", light: "bg-green-500" },
    YELLOW: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", light: "bg-yellow-500" },
    RED: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", light: "bg-red-500" },
    BLACK: { bg: "bg-gray-900", text: "text-white", border: "border-gray-700", light: "bg-gray-600" },
    OSTRICH_FEATHER: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", light: "bg-purple-500" },
  };

  return (
    colors[level as keyof typeof colors] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      light: "bg-gray-400",
    }
  );
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<User[]>(data); // 🔥 local UI state
  const [suspendUser] = useSuspendUserMutation();
  const [activeUser] = useActiveUserMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [updateCaplevel] = useUpdateCaplevelMutation();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  };

  const handleAction = async (id: string, status: string) => {
    try {
      if (status === "active") {
        await suspendUser(id).unwrap();
        toast.success("Suspend account successfully!");
        setTableData(prev =>
          prev.map(user => user.id === id ? { ...user, status: "suspended" } : user)
        );
      } else {
        await activeUser(id).unwrap();
        toast.success("Activate account successfully!");
        setTableData(prev =>
          prev.map(user => user.id === id ? { ...user, status: "active" } : user)
        );
      }
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleCapLevelClick = (userId: string) => {
    if (updatingUserId === userId) return;
    setIsDropdownOpen(isDropdownOpen === userId ? null : userId);
  };

  const handleCapLevelChange = async (userId: string, level: string) => {
    setIsDropdownOpen(null);
    setUpdatingUserId(userId);

    try {
      await updateCaplevel({
        userId,
        targetLevel: level,
        bypassVerification: true,
      }).unwrap();

      // 🔥 Instant UI update
      setTableData(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, level } : user
        )
      );

      toast.success(`Cap level updated to ${level}`);
    } catch (error) {
      toast.error("Failed to update cap level");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const formatLevelName = (level: string) =>
    level
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const levelOptions = [
    { value: "GREEN", label: "Green", description: "Beginner level" },
    { value: "YELLOW", label: "Yellow", description: "Intermediate level" },
    { value: "RED", label: "Red", description: "Advanced level" },
    { value: "BLACK", label: "Black", description: "Expert level" },
    { value: "OSTRICH_FEATHER", label: "Ostrich Feather", description: "Elite level" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">User</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Role</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Status</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Level</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Points</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Joined</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row) => {
            const levelColor = getLevelColor(row.level);
            const isUpdating = updatingUserId === row.id;

            return (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-[#0A0A0A]">
                      {getInitials(row.name)}
                    </div>
                    <div>
                      <div className="text-sm font-normal text-[#101828]">{row.name}</div>
                      <div className="text-sm text-[#6A7282] font-normal">{row.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span className="text-sm text-[#364153] font-normal">{row.role}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-normal ${
                      row.status === "active"
                        ? "bg-[#DCFCE7] text-[#008236]"
                        : "bg-[#FFEDD4] text-[#CA3500]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Level */}
                <td className="px-6 py-4">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => !isUpdating && handleCapLevelClick(row.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                          isUpdating
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer group hover:shadow-sm"
                        } ${levelColor.bg} ${levelColor.border} ${levelColor.text}`}
                      >
                        {isUpdating ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <div className={`w-2 h-2 rounded-full ${levelColor.light}`}></div>
                            <span className="text-sm font-medium">{formatLevelName(row.level)}</span>
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${
                                isDropdownOpen === row.id ? "rotate-180" : ""
                              }`}
                            />
                          </>
                        )}
                      </div>
                      <TrendingUp size={16} className="text-[#155DFC]" />
                    </div>

                    {isDropdownOpen === row.id && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 px-2 py-1 uppercase tracking-wide mb-1">
                            Select Level
                          </div>
                          <div className="space-y-1">
                            {levelOptions.map((level) => {
                              const optionColor = getLevelColor(level.value);
                              const isSelected = row.level === level.value;

                              return (
                                <div
                                  key={level.value}
                                  onClick={() => handleCapLevelChange(row.id, level.value)}
                                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                    isSelected ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <div className={`w-3 h-3 rounded-full ${optionColor.light}`} />
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{level.label}</div>
                                    <div className="text-xs text-gray-500">{level.description}</div>
                                  </div>
                                  {isSelected && <Check size={16} className="text-blue-600 flex-shrink-0" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                {/* Points */}
                <td className="px-6 py-4">
                  <span className="text-sm text-[#364153] font-normal">{row.points}</span>
                </td>

                {/* Joined */}
                <td className="px-6 py-4">
                  <span className="text-sm text-[#6A7282] whitespace-nowrap">
                    {row.joinedAt?.slice(0, 10)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleAction(row.id, row.status)}
                    className={`text-sm items-center text-[#ffffff] hover:bg-white justify-center transition-colors border px-3 py-2 rounded-lg cursor-pointer ${
                      row.status === "suspended"
                        ? "bg-[#008236] border-[#008236] hover:text-[#008236]"
                        : "bg-[#CA3500] border-[#CA3500] hover:text-[#CA3500]"
                    }`}
                  >
                    {row.status === "suspended" ? "Active" : "Suspend"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
