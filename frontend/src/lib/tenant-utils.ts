import { Tenant } from "@/shared/models";

export const getTenant = async (
  slug: string,
  accessToken?: string
): Promise<Tenant | null> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL}/api/tenants/by-slug/${slug}`,
      {
        headers,
        // Add cache control if needed
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch tenant");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
};
