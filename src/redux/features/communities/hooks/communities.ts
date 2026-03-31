import { useMemo, useState } from "react";
import { useGetAllCommunitiesQuery } from "../communitiesApi";

export const useCommunities = (filters = {}) => {
	const [page, setPage] = useState(1);

	const queryParams = useMemo(
		() => ({
			page,
			limit: 10,
			...filters, // include search, category, location, etc.
		}),
		[page, filters]
	);

	const { data, isLoading, isError } = useGetAllCommunitiesQuery(queryParams);

	// Normalize data
	const community = Array.isArray(data?.data) ? data.data : [];
	const totalPages = data?.pagination?.pages ?? 1;
	const total = data?.pagination?.total ?? 0;
	const currentPage = data?.pagination?.page ?? page;

	return {
		community,
		isLoading,
		isError,
		page: currentPage,
		setPage,
		totalPages,
		total,
	};
};
