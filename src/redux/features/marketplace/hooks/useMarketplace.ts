import { useMemo, useState } from "react";
import { useGetAllMarketplaceQuery } from "../marketplaceApi";

export const useMarketplace = (filters = {}) => {
	const [page, setPage] = useState(1);
	console.log("1", filters);
	const queryParams = useMemo(
		() => ({
			page,
			limit: 10,
			...filters, // include search, category, location, etc.
		}),
		[page, filters]
	);

	const { data, isLoading, isError } = useGetAllMarketplaceQuery(queryParams);

	// Normalize data
	const market = Array.isArray(data?.data) ? data.data : [];
	const totalPages = data?.meta?.totalPages ?? 1;
	const total = data?.meta?.total ?? 0;
	const currentPage = data?.pagination?.page ?? page;
	return {
		market,
		isLoading,
		isError,
		page: currentPage,
		setPage,
		totalPages,
		total,
	};
};
