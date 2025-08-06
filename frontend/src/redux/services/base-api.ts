import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL;
  const result = await fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: BaseQuery,
  endpoints: () => ({}),
});
