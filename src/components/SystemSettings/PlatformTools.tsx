import { useGetSearchStatusQuery, useReindexSearchMutation } from "@/redux/features/search/searchApi";
import { Database, RefreshCw } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PlatformTools() {
  const { data: searchStatus } = useGetSearchStatusQuery(undefined);
  const [reindex, { isLoading }] = useReindexSearchMutation();
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleReindex = async () => {
    try {
      const result = await reindex(undefined).unwrap();
      const msg =
        typeof result === "object"
          ? JSON.stringify(result)
          : "Reindex completed";
      setLastResult(msg);
      toast.success("Search index rebuilt");
    } catch {
      toast.error("Reindex failed — check admin permissions");
    }
  };

  return (
    <div className="bg-white border border-[#0000001a] rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Database size={20} className="text-[#1447E6]" />
        <h2 className="text-base font-medium text-[#101828]">Platform Tools</h2>
      </div>

      <div className="border border-gray-100 rounded-lg p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm text-[#101828]">AI Search Index</p>
            <p className="text-xs text-[#6A7282] mt-1">
              Provider: {searchStatus?.provider ?? "—"} ·{" "}
              {searchStatus?.enabled ? "Enabled" : "Disabled"}
            </p>
          </div>
          <button
            onClick={handleReindex}
            disabled={isLoading}
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[#1447E6] text-white rounded-lg text-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Reindexing..." : "Full Reindex"}
          </button>
        </div>
        {lastResult && (
          <p className="text-xs text-[#4A5565] bg-gray-50 p-2 rounded">
            Last result: {lastResult}
          </p>
        )}
      </div>
    </div>
  );
}
