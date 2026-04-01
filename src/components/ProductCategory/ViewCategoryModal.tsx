/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { X, Calendar, Hash, FileText } from "lucide-react";

interface ViewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isLoading: boolean;
}

const ViewCategoryModal: React.FC<ViewCategoryModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
}) => {
  if (!isOpen) return null;

  const category = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#101828]">Category Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading details...
          </div>
        ) : category ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Hash className="text-gray-400 mt-1" size={18} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Name & Slug
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {category.name}
                </p>
                <p className="text-xs text-blue-600">/{category.slug}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="text-gray-400 mt-1" size={18} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Description
                </p>
                <p className="text-sm text-gray-700">
                  {category.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="text-gray-400 mt-1" size={18} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Created At
                </p>
                <p className="text-sm text-gray-700">
                  {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-red-500">
            Failed to load data.
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#030213] text-white py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewCategoryModal;
