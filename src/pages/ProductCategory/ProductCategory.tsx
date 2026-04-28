/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import {
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
  useGetSingleProductCategoryQuery,
} from "@/redux/features/productCategory/productCategoryApi";
import SearchBar from "@/components/common/SearchBar";
import { Package, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import AddCategoryModal from "@/components/ProductCategory/AddCategoryModal";
import ViewCategoryModal from "@/components/ProductCategory/ViewCategoryModal";
import DeleteConfirmationModal from "@/components/ProductCategory/DeleteConfirmationModal"; // New Import
import toast from "react-hot-toast";

const ProductCategory: React.FC = () => {
  const { data: response, isLoading } = useGetProductCategoriesQuery({});
  const [createProductCategory] = useCreateProductCategoryMutation();
  const [deleteProductCategory, { isLoading: isDeleting }] =
    useDeleteProductCategoryMutation();

  // Local States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  // View States
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Delete States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Trigger query ONLY when an ID is selected
  const { data: singleCategory, isFetching: isSingleLoading } =
    useGetSingleProductCategoryQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });

  const filteredCategories = useMemo(() => {
    const categories = response?.data || [];
    return categories.filter((cat: any) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [response, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [filteredCategories, currentPage]);

  const handleAddCategory = async (data: any) => {
    try {
      const res = await createProductCategory(data).unwrap();
      if (!res.success) {
        toast.error(res.message || "Failed to create category!");
        return;
      }
      toast.success("Category created successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create category!");
    }
  };

  // Open the delete modal
  const openDeleteModal = (category: any) => {
    setCategoryToDelete({ id: category.id, name: category.name });
    setIsDeleteModalOpen(true);
  };

  // Perform the actual delete
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const res = await deleteProductCategory(categoryToDelete.id).unwrap();
      if (!res.success) {
        toast.error(res.message || "Failed to delete category!");
        return;
      }
      toast.success(res.message || "Category deleted successfully!");
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete category!");
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedCategoryId(id);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#101828]">
            Product Category
          </h1>
          <p className="text-[#4A5565] text-sm">
            View and manage product categories
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-[#030213] hover:bg-black text-white rounded-lg px-6 py-2 transition-all"
        >
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="border border-[#0000001a] rounded-xl overflow-hidden bg-white p-4">
        <SearchBar
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#0000001a] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Category Name
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Slug
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((category: any) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Package size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                      {category.description || "No description"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleViewDetails(category.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(category)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#0000001a]">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredCategories.length)}
            </span>{" "}
            of <span className="font-medium">{filteredCategories.length}</span>{" "}
            results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      <ViewCategoryModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCategoryId(null);
        }}
        data={singleCategory}
        isLoading={isSingleLoading}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        categoryName={categoryToDelete?.name || ""}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductCategory;
