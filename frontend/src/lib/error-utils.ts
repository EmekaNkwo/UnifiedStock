import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

type ApiError = {
  data?: {
    message?: string;
    error?: string;
  };
  status?: number;
};

/**
 * Extracts error message from RTK Query error
 */
export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) return "An unknown error occurred";

  if ("status" in error) {
    // Handle FetchBaseQueryError
    const apiError = error as ApiError;
    return (
      apiError.data?.message || apiError.data?.error || "An error occurred"
    );
  }

  // Handle SerializedError
  return error.message || "An error occurred";
};

/**
 * Shows error toast with the error message
 */
export const showErrorToast = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "An unknown error occurred";

  toast.error(message);
};

/**
 * Handles API errors and shows toast
 */
export const handleApiError = (error: unknown) => {
  const message = getErrorMessage(
    error as FetchBaseQueryError | SerializedError
  );
  showErrorToast(message);
  return message;
};
