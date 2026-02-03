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
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todo/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
    getTodoById: builder.query({
      query: (params) => ({
        url: "/api/todo/getTodoById",
        params,
      }),
    }),
    updateTodo : builder.mutation({
      query : (data)=>({
        url : '/api/todo/updateTodo',
        method :'PATCH',
        body : data
      })
    })
  }),
});

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation
} = todoApiSlice;
