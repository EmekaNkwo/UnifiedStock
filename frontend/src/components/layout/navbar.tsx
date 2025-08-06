import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  brandName?: string;
  navLinks?: NavLink[];
  cta?: {
    label: string;
    href: string;
    className?: string;
  };
  className?: string;
}

export function Navbar({
  logo = <GalleryVerticalEnd className="size-10" />,
  brandName = "UnifiedStock",
  navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
  ],
  cta,
  className = "",
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {logo}
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {brandName}
        </span>
      </div>

      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {cta ? (
        <Link
          href={cta.href}
          className={cn(
            "px-6 py-2 rounded-lg transition-colors",
            cta.className
          )}
        >
          {cta.label}
        </Link>
      ) : null}
    </nav>
  );
}
