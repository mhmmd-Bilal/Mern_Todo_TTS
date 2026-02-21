import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-todo-tts.onrender.com",
    credentials: true,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
