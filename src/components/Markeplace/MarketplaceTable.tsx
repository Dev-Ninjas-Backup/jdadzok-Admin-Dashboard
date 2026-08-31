import React, { useState } from "react";
import { Eye, Star, Package } from "lucide-react";
import MarketPlaceModal from "./MarketPlaceModal";

interface Product {
  title: string;
  isFeatured?: boolean;
  seller: string;
  category: string;
  price: string | number;
  stock: number;
  totalSalesAmount: number;
  rating: number | null;
  status: "CONTINUED" | "SOLDOUT" | "pending";
}

const MarketplaceTable: React.FC<{ data: Product[] }> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Product
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Seller
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Category
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Price
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Stock
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Sales
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              Status
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#0A0A0A]">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((product, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-[#101828] whitespace-nowrap">
                      {product.title}
                    </div>
                    {product.isFeatured && (
                      <div className="flex items-center gap-1 border border-[#0000001a] w-fit px-2 py-1 rounded-lg whitespace-nowrap">
                        <Star
                          size={12}
                          className="text-[#F0B100] fill-[#F0B100]"
                        />
                        <span className="text-xs text-[#0A0A0A]">Featured</span>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm whitespace-nowrap text-[#364153]">
                  {product.seller}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-[#0A0A0A] border border-[#0000001a] px-2 py-1 rounded-lg whitespace-nowrap">
                  {product.category}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-medium text-[#101828]">
                  {product.price}
                </span>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`text-sm font-medium ${
                    product.stock === 0 ? "text-[#CA3500]" : "text-[#364153]"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-[#364153]">
                  {product.totalSalesAmount}
                </span>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                    product.status === "CONTINUED"
                      ? "bg-[#DCFCE7] text-[#008236]"
                      : product.status === "SOLDOUT"
                        ? "bg-[#FFEDD4] text-[#CA3500]"
                        : "bg-[#ECEEF2] text-[#030213]"
                  }`}
                >
                  {product.status === "CONTINUED" && "Active"}
                  {product.status === "SOLDOUT" && "Out of Stock"}
                  {product.status === "pending" && "Pending"}
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  onClick={() => openModal(product)}
                  className="cursor-pointer hover:bg-gray-100 border border-[#0000001a] px-2 py-1.5 rounded-lg transition-colors"
                >
                  <Eye size={18} className="text-[#0A0A0A]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MarketPlaceModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={selectedProduct!}
      />
    </div>
  );
};

export default MarketplaceTable;
