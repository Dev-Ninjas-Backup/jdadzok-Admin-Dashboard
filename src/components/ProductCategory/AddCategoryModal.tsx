import React, { useState } from "react";
import { X } from "lucide-react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; slug: string; description: string }) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  if (!isOpen) return null;

  // Helper to auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    // Convert to lowercase, replace spaces with hyphens, remove special chars
    const generatedSlug = val
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(generatedSlug);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      name: name,
      slug: slug,
      description: formData.get("description") as string,
    });
    
    setName("");
    setSlug("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#101828]">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-[#344054] mb-1.5">
              Category Name *
            </label>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#030213] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Electronics"
            />
          </div>

          {/* Slug Input */}
          <div>
            <label className="block text-sm font-medium text-[#344054] mb-1.5">
              Slug (URL-friendly) *
            </label>
            <input
              name="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-2.5 focus:ring-2 focus:ring-[#030213] focus:border-transparent outline-none transition-all"
              placeholder="electronics"
            />
            <p className="mt-1 text-xs text-gray-500">
              Example: my-category-name
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#344054] mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#030213] focus:border-transparent outline-none transition-all"
              placeholder="Describe what kind of products belong here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#030213] text-white py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-medium cursor-pointer"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
