import { useMemo, useState } from "react";
import { useGetAllUserQuery } from "../userApi";

export const useUser = (filters = {}) => {
	const [page, setPage] = useState(1);

	const queryParams = useMemo(
		() => ({
			page,
			limit: 10,
			...filters, // include search, category, location, etc.
		}),
		[page, filters]
	);

	const { data, isLoading, isError } = useGetAllUserQuery(queryParams);

	// Normalize data
	const user = Array.isArray(data?.data) ? data.data : [];
	const totalPages = data?.pagination?.pages ?? 1;
	const total = data?.pagination?.total ?? 0;
	const currentPage = data?.pagination?.page ?? page;

	return {
		user,
		isLoading,
		isError,
		page: currentPage,
		setPage,
		totalPages,
		total,
	};
};
