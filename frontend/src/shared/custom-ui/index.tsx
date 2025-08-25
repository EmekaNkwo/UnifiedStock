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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LucideIcon } from "lucide-react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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
            {/* <ChevronRight className="w-4 h-4 ml-auto" /> */}
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
          "text-red-500":
            item.label?.toString().toLowerCase() === "log out" ||
            item.label?.toString().toLowerCase() === "delete",
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
        <Button variant="ghost" size="icon">
          {trigger}
        </Button>
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
  onCancel?: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  children?: ReactNode;
  className?: string;
}

export function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  showCancel = true,
  children,
  className,
}: FormActionsProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 pt-4", className)}>
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
  onSubmit?: () => void;
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
  showCancel = false,
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
            {onSubmit && (
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
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface CustomInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: FieldErrors<FieldValues>;
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}

export function CustomInput({
  id,
  label,
  type = "text",
  placeholder = "",
  icon: Icon,
  error,
  registration,
  className,
  required = false,
  disabled = false,
  ...props
}: CustomInputProps) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium",
          error ? "text-destructive" : "text-gray-900"
        )}
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              className={cn(
                "h-5 w-5",
                error ? "text-destructive" : "text-gray-400"
              )}
            />
          </div>
        )}

        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full text-gray-900 dark:text-gray-100",
            Icon && "pl-10",
            error
              ? "border-destructive focus-visible:ring-destructive"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          )}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          {...registration}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error?.root?.message}
        </p>
      )}
    </div>
  );
}

export function CustomButton({
  label,
  type = "button",
  onClick,
  disabled,
  isLoading = false,
  className = "bg-blue-600 text-white",
}: {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "w-full font-medium hover:bg-blue-700 flex items-center justify-center gap-2",
        className,
        { "opacity-75 cursor-not-allowed": isLoading }
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}

export function TextField<T extends FieldValues>({
  control,
  type = "text",
  name,
  label = "",
  placeholder = "",
  leftIcon,
  rightIcon,
  onClick,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {leftIcon}
                </div>
              )}
              <Input
                type={type}
                min={0}
                placeholder={placeholder}
                className={cn({
                  "pl-10": leftIcon,
                  "pr-10": rightIcon,
                })}
                {...field}
              />
              {rightIcon && (
                <div
                  className={`${cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground ",
                    onClick ? "cursor-pointer" : ""
                  )}`}
                  onClick={onClick}
                >
                  {rightIcon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextAreaField<T extends FieldValues>({
  control,
  name,
  label = "",
  placeholder = "",
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="resize-none"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label = "",
  placeholder = "",
  options,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <CustomSelect
              {...field}
              options={options}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
