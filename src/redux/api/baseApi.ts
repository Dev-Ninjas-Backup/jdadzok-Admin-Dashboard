// src/redux/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		// baseUrl: process.env.REACT_APP_API_URL || "http://13.204.75.28:5056/",
		baseUrl: "http://13.204.75.28:5056/",
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token"); // token persisted on login
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["Auth", "Users", "Community", "Events", "Marketplace"],
	endpoints: () => ({}),
});

export default baseApi;
