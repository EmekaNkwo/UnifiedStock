import { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

export const DashboardContainer = ({
  children,
  className = "",
}: DashboardContainerProps) => {
  return <div className={`space-y-6 py-4 ${className}`}>{children}</div>;
};
