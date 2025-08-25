import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("animate-spin", {
  variants: {
    variant: {
      default:
        "h-8 w-8 border-4 border-primary border-t-transparent rounded-full",
      dots: "flex items-center justify-center space-x-1",
      ring: "h-8 w-8 border-2 border-primary border-t-transparent rounded-full",
      pulse: "h-8 w-8 bg-primary rounded-full animate-pulse",
    },
    size: {
      sm: "h-4 w-4 text-sm",
      md: "h-8 w-8 text-base",
      lg: "h-12 w-12 text-lg",
    },
  },
  defaultVariants: {
    variant: "dots",
    size: "md",
  },
});

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

export function Spinner({
  variant = "dots",
  size = "md",
  className,
  label,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-2",
        className
      )}
      role="status"
      aria-label={label || "Loading..."}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          spinnerVariants({ variant, size, className })
        )}
      >
        {variant === "dots" ? (
          <>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full bg-current",
                  "animate-bounce",
                  "mx-0.5"
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </>
        ) : variant === "pulse" ? (
          <div className="h-full w-full rounded-full bg-current" />
        ) : variant === "ring" ? (
          <Loader2 className="h-full w-full" />
        ) : null}
      </div>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}
