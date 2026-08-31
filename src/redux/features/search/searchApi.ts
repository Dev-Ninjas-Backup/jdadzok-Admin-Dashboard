import baseApi from "../../api/baseApi";
import { unwrapApiData } from "../../utils/unwrapApiData";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchStatus: builder.query({
      query: () => ({ url: "/search/status", method: "GET" }),
      transformResponse: unwrapApiData,
    }),
    reindexSearch: builder.mutation({
      query: () => ({ url: "/search/reindex", method: "POST" }),
      transformResponse: unwrapApiData,
    }),
  }),
});

export const { useGetSearchStatusQuery, useReindexSearchMutation } = searchApi;
