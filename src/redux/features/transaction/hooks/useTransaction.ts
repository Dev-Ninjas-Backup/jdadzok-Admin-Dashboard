import { useMemo, useState } from "react";
import { useGetAllTransactionQuery } from "../transactionApi";

export const useTransaction = (filters = {}) => {
	const [page, setPage] = useState(1);

	const queryParams = useMemo(
		() => ({
			page,
			limit: 10,
			...filters, // include search, category, location, etc.
		}),
		[page, filters]
	);

	const { data, isLoading, isError } = useGetAllTransactionQuery(queryParams);

	// Normalize data
	const transaction = Array.isArray(data?.data) ? data.data : [];
	const totalPages = data?.pages ?? 1;
	const total = data?.total ?? 0;
	const currentPage = data?.page ?? page;

	return {
		transaction,
		isLoading,
		isError,
		page: currentPage,
		setPage,
		totalPages,
		total,
	};
};
