import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight } from "lucide-react";
import React, { useCallback, ReactNode } from "react";

interface DropdownMenuActionProps {
  trigger: ReactNode | string;
  items: Array<{
    label: ReactNode | string;
    onClick?: () => void;
    icon?: ReactNode;
    disabled?: boolean;
    type?: "item" | "separator" | "submenu";
    items?: DropdownMenuItemType[];
  }>;
  align?: "start" | "center" | "end";
  width?: number;
  className?: string;
  showDropdownMenu?: boolean;
}

type DropdownMenuItemType = {
  label: ReactNode | string;
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "item" | "separator" | "submenu";
  items?: DropdownMenuItemType[];
};

interface ProfileAvatarProps extends React.ComponentProps<typeof Avatar> {
  name?: string;
  imageUrl?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  fallbackColor?: string;
}

const sizeClasses = {
  xs: "size-10 text-lg",
  sm: "size-16 text-xl",
  md: "size-20 text-2xl",
  lg: "size-24 text-3xl",
};

export const ProfileAvatar = React.forwardRef<
  HTMLDivElement,
  ProfileAvatarProps
>(
  (
    {
      name = "",
      imageUrl = "",
      size = "md",
      className,
      fallbackColor,
      ...props
    },
    ref
  ) => {
    const getInitials = useCallback(() => {
      if (!name) return "";
      const names = name.trim().split(" ");
      if (names?.length === 1) return names[0].charAt(0).toUpperCase();
      return `${names[0].charAt(0)}${names[names?.length - 1].charAt(
        0
      )}`.toUpperCase();
    }, [name]);

    return (
      <Avatar ref={ref} className={cn(sizeClasses[size], className)} {...props}>
        {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
        <AvatarFallback className={fallbackColor ?? "font-normal"}>
          {getInitials() || "?"}
        </AvatarFallback>
      </Avatar>
    );
  }
);

ProfileAvatar.displayName = "ProfileAvatar";

export const DropdownMenuAction = ({
  trigger,
  items,
  align = "end",
  width = 32,
  className,
  showDropdownMenu = true,
}: DropdownMenuActionProps) => {
  const renderMenuItem = (item: DropdownMenuItemType, index: number) => {
    if (item.type === "separator") {
      return <DropdownMenuSeparator key={`separator-${index}`} />;
    }

    if (item.type === "submenu" && item.items?.length) {
      return (
        <DropdownMenuSub key={`submenu-${index}`}>
          <DropdownMenuSubTrigger className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </div>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {item.items.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex)
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={`item-${index}`}
        onClick={item.onClick}
        disabled={item.disabled}
        className={cn("flex items-center gap-2 font-medium cursor-pointer", {
          "text-red-500": item.label?.toString().toLowerCase() === "log out",
        })}
      >
        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
        {item.label}
      </DropdownMenuItem>
    );
  };

  if (!showDropdownMenu) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn(`w-${width}`, "min-w-[2rem]")}
      >
        {items.map((item, index) => renderMenuItem(item, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface StatusSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  options: Array<{ label: string; value: string }>;
}

export function CustomSelect({
  value,
  onChange,
  placeholder = "Select",
  className,
  options,
}: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  children?: ReactNode;
}

export function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  showCancel = true,
  children,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      {showCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          submitLabel
        )}
      </Button>
      {children}
    </div>
  );
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const modalSizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

export function CustomModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  children,
  isLoading = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  showCancel = true,
  size = "md",
  className = "",
}: FormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`${modalSizeClasses[size]} ${className}`}
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter className="pt-2">
          <div className="flex items-center justify-end gap-2 w-full">
            {showCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
