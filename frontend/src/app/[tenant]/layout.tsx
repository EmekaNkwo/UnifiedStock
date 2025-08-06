"use client";
import { getTenant } from "@/lib/tenant-utils";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken") || undefined;
        const tenant = await getTenant(params.tenant, accessToken);

        if (!tenant) {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching tenant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenant();
  }, [params.tenant, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return <>{children}</>;
}
