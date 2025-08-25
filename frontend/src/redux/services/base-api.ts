import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface BackendResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

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

  if (result.error?.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  if (result.error) {
    return {
      error: {
        status: result.error.status,
        data: result.error.data || "An error occurred",
      },
    };
  }

  // Handle successful responses
  const response = result.data as BackendResponse<unknown>;

  // If the response follows our standard format and has data, return the data
  if (response && typeof response === "object" && "data" in response) {
    return { data: response.data };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: BaseQuery,
  endpoints: () => ({}),
});
