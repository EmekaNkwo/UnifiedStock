import { Tenant } from "@/shared/models";

// Mock data - replace with actual API/database calls in production
const MOCK_TENANTS = [
  { id: "1", slug: "onitsha-store", name: "Onitsha Store" },
  { id: "2", slug: "ikorodu-store", name: "Ikorodu Store" },
];

/**
 * Fetches a tenant by its slug
 * @param slug The tenant slug from the URL
 * @returns Promise<Tenant | null>
 */
export async function getTenant(slug: string): Promise<Tenant | null> {
  // In a real app, this would be an API call to your backend
  // Example: return await fetch(`/api/tenants/${slug}`).then(res => res.json());

  // Mock implementation
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const tenant =
        MOCK_TENANTS.find((t) => t.slug === slug.toLowerCase()) || null;
      resolve(tenant);
    }, 100);
  });
}

/**
 * Fetches all available tenants
 * @returns Promise<Tenant[]>
 */
export async function getAllTenants(): Promise<Tenant[]> {
  // In a real app, this would be an API call to your backend
  // Example: return await fetch('/api/tenants').then(res => res.json());

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_TENANTS]);
    }, 100);
  });
}
