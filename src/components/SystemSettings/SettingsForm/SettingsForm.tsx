// src/app/settings/SettingsForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useCreateSettingsMutation, useGetSettingsQuery } from "@/redux/features/systemSettings/systemSettingsApi";
import toast from "react-hot-toast";
// src/types/settings.ts
export interface Settings {
  id?: number;
  like: number;
  comment: number;
  share: number;
  post: number;
  greenCapScore: number;
  redCapScore: number;
  blackCapScore: number;
  yellowCapScore: number;
  productSpentPercentage: number;
  productPromotionPercentage: number;
  createdAt?: string;
  updatedAt?: string;
}


export default function SettingsForm() {
  const { data, isFetching, refetch } = useGetSettingsQuery(null);
  const settings: Settings | undefined = data?.data || data?.[0] || data;

  const [createSettings, { isLoading }] = useCreateSettingsMutation();

  const [formData, setFormData] = useState<Settings>({
    like: 1,
    comment: 1,
    share: 1,
    post: 1,
    greenCapScore: 1,
    redCapScore: 1,
    blackCapScore: 1,
    yellowCapScore: 1,
    productSpentPercentage: 4,
    productPromotionPercentage: 2,
  });

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSettings(formData).unwrap();
      toast.success("Settings Saved Successfully!");
      refetch(); // Refresh UI after save
    } catch {
      toast.error("Error while saving settings");
    }
  };

  if (isFetching) return <p className="text-center py-8 text-gray-500">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white shadow-lg p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 my-10"
    >
      {/* ===== Show Current Settings ===== */}
      {settings && (
        <div className="col-span-full bg-gray-50 border border-gray-200 p-5 rounded-lg mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(settings)
              .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between bg-white rounded-md border border-gray-200 px-3 py-2 text-sm font-medium"
                >
                  <span className="capitalize text-gray-600">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ===== Form Fields ===== */}
      <h2 className="text-2xl font-bold col-span-full text-gray-800 mb-4">
        System Settings Configuration
      </h2>

      {Object.entries(formData).map(([key, value]) => {
        if (["id", "createdAt", "updatedAt"].includes(key)) return null;
        return (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="number"
              min={0}
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="col-span-full bg-black cursor-pointer text-white w-full py-3 rounded-lg  transition font-semibold disabled:bg-indigo-400"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
