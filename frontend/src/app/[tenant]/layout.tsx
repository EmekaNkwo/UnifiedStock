import { getTenant } from "@/lib/tenant-utils";
import { notFound } from "next/navigation";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  // Fetch tenant data (you'll need to implement this)
  const tenant = await getTenant(params.tenant);

  // If tenant doesn't exist, redirect to 404 or home
  if (!tenant) {
    notFound();
  }

  return <>{children}</>;
}
