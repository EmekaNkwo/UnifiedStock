import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unparse } from "papaparse";

interface GenerateSkuOptions {
  prefix?: string; // Optional category prefix (e.g., "CLO" for clothing)
  length?: number; // Length of the random part (default: 6)
  separator?: string; // Separator between parts (default: "-")
  includeDate?: boolean; // Whether to include date in the SKU
}

type ExportCsvOptions<T> = {
  rows: T[];
  filename?: string;
  headers?: { label: string; key: keyof T }[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSkuNo = (options: GenerateSkuOptions = {}) => {
  const {
    prefix = "",
    length = 6,
    separator = "-",
    includeDate = true,
  } = options;

  // Generate random alphanumeric string
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed similar looking characters
  let randomPart = "";

  for (let i = 0; i < length; i++) {
    randomPart += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Format date as YYMMDD if needed
  const datePart = includeDate
    ? new Date().toISOString().slice(2, 10).replace(/-/g, "")
    : "";

  // Build the final SKU
  const parts = [prefix.toUpperCase(), datePart, randomPart].filter(Boolean); // Remove any empty strings

  return parts.join(separator);
};

export function exportToCsv<T>({
  rows,
  filename = "export.csv",
  headers,
}: ExportCsvOptions<T>) {
  if (!rows?.length) {
    console.warn("No data to export");
    return;
  }

  // If headers provided, map rows accordingly
  let data: any[] = rows;
  if (headers) {
    data = rows.map((row) => {
      const mapped: Record<string, unknown> = {};
      headers.forEach((h) => {
        mapped[h.label] = row[h.key];
      });
      return mapped;
    });
  }

  const csv = unparse(data);

  // Trigger browser download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
