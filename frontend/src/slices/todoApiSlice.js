import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/api/todo",
      }),
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/api/todo/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {
    useAddTodoMutation,
    useGetTodosQuery
} = todoApiSlice