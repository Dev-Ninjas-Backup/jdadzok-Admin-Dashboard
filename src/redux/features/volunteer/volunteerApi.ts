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
    getAllVolunteerProjects: builder.query({
      query: () => ({
        url: "/volunteer/allProjects",
        method: "GET",
      }),
      providesTags: ["Volunteer"],
    }),
    getProjectApplications: builder.query({
      query: (projectId: string) => ({
        url: `/volunteer/project/${projectId}/applications`,
        method: "GET",
      }),
      providesTags: ["Volunteer"],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ applicationId, status, completionNote }) => ({
        url: `/volunteer/status/${applicationId}`,
        method: "PATCH",
        body: { status, completionNote },
      }),
      invalidatesTags: ["Volunteer"],
    }),
  }),
});

export const {
  useGetPendingEndorsementQuery,
  useEndorseHoursMutation,
  useRejectHoursMutation,
  useGetAllVolunteerProjectsQuery,
  useGetProjectApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = volunteerApi;
