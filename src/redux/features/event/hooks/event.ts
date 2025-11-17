import { useMemo, useState } from "react";
import { useGetAllEventQuery } from "../eventApi";

export const useEvent = (filters = {}) => {
	const [page, setPage] = useState(1);

	const queryParams = useMemo(
		() => ({
			page,
			limit: 10,
			...filters, // include search, category, location, etc.
		}),
		[page, filters]
	);

	const { data, isLoading, isError } = useGetAllEventQuery(queryParams);

	// Normalize data
	const event = Array.isArray(data) ? data : [];
	const totalPages = data?.pagination?.pages ?? 1;
	const total = data?.pagination?.total ?? 0;
	const currentPage = data?.pagination?.page ?? page;

	return {
		event,
		isLoading,
		isError,
		page: currentPage,
		setPage,
		totalPages,
		total,
	};
};
