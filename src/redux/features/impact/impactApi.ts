import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const impactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImpactSummary: builder.query({
      query: (params: { fromDate?: string; toDate?: string; minBucketSize?: number } = {}) => {
        const searchParams = new URLSearchParams();
        if (params.fromDate) searchParams.append("fromDate", params.fromDate);
        if (params.toDate) searchParams.append("toDate", params.toDate);
        if (params.minBucketSize)
          searchParams.append("minBucketSize", String(params.minBucketSize));
        return {
          url: `/impact/export/summary?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: unwrapApiData,
      providesTags: ["Impact"],
    }),
    getImpactBreakdown: builder.query({
      query: (params: { fromDate?: string; toDate?: string; minBucketSize?: number } = {}) => {
        const searchParams = new URLSearchParams();
        if (params.fromDate) searchParams.append("fromDate", params.fromDate);
        if (params.toDate) searchParams.append("toDate", params.toDate);
        if (params.minBucketSize)
          searchParams.append("minBucketSize", String(params.minBucketSize));
        return {
          url: `/impact/export/breakdown?${searchParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: unwrapApiData,
      providesTags: ["Impact"],
    }),
  }),
});

export const { useGetImpactSummaryQuery, useGetImpactBreakdownQuery } = impactApi;
