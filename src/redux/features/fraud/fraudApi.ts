import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const fraudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFraudStatus: builder.query({
      query: () => ({ url: "/abuse/fraud/status", method: "GET" }),
      transformResponse: unwrapApiData,
    }),
    getFraudChecks: builder.query({
      query: (args: { decision?: string; page?: number; limit?: number } = {}) => {
        const { decision, page = 1, limit = 20 } = args;
        const searchParams = new URLSearchParams();
        if (decision) searchParams.append("decision", decision);
        searchParams.append("page", String(page));
        searchParams.append("limit", String(limit));
        return {
          url: `/abuse/fraud/checks?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: unwrapApiData,
      providesTags: ["Fraud"],
    }),
    clearFraudCheck: builder.mutation({
      query: (id: string) => ({
        url: `/abuse/fraud/checks/${id}/clear`,
        method: "POST",
      }),
      transformResponse: unwrapApiData,
      invalidatesTags: ["Fraud"],
    }),
  }),
});

export const {
  useGetFraudStatusQuery,
  useGetFraudChecksQuery,
  useClearFraudCheckMutation,
} = fraudApi;
