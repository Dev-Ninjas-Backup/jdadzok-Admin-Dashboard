import baseApi from "../../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//get All Users
		getAllTransactionOverview: builder.query({
			query: () => ({
				url: "/orders_transaction/stats",
				method: "GET",
			}),
			providesTags: ["Transaction"],
		}),

		getAllTransaction: builder.query({
			query: ({ search, status, page = 1, limit = 10 }) => {
				const params = new URLSearchParams();

				if (search) params.append("search", search);
				if (status) params.append("status", status);
				params.append("page", page.toString());
				params.append("limit", limit.toString());

				return {
					url: `/orders_transaction?${params.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Transaction"],
		}),
	}),
});

export const { useGetAllTransactionOverviewQuery, useGetAllTransactionQuery } =
	transactionApi;
