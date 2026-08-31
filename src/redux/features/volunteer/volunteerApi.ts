import baseApi from "../../api/baseApi";

export const volunteerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingEndorsement: builder.query({
      query: () => ({
        url: "/volunteer/hours/pending-endorsement",
        method: "GET",
      }),
      providesTags: ["Volunteer"],
    }),
    endorseHours: builder.mutation({
      query: ({ hourId, message }) => ({
        url: `/volunteer/hours/${hourId}/endorse`,
        method: "PATCH",
        body: { message },
      }),
      invalidatesTags: ["Volunteer"],
    }),
    rejectHours: builder.mutation({
      query: ({ hourId, rejectionNote }) => ({
        url: `/volunteer/hours/${hourId}/reject`,
        method: "PATCH",
        body: { rejectionNote },
      }),
      invalidatesTags: ["Volunteer"],
    }),
  }),
});

export const {
  useGetPendingEndorsementQuery,
  useEndorseHoursMutation,
  useRejectHoursMutation,
} = volunteerApi;
