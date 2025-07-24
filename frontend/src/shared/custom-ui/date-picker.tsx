// src/shared/custom-ui/date-picker.tsx
"use client";

import * as React from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format, isDate } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface BaseDatePickerProps {
  placeholder?: string;
  label?: string;
  className?: string;
  buttonClassName?: string;
  showIcon?: boolean;
  disabled?: boolean;
  required?: boolean;
  fromDate?: Date;
  toDate?: Date;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  numberOfMonths?: number;
}

interface SingleDatePickerProps extends BaseDatePickerProps {
  mode?: "single";
  value?: Date;
  onChange: (date?: Date) => void;
}

interface RangeDatePickerProps extends BaseDatePickerProps {
  mode: "range";
  value?: DateRange;
  onChange: (range?: DateRange) => void;
}

interface MultipleDatePickerProps extends BaseDatePickerProps {
  mode: "multiple";
  value?: Date[];
  onChange: (dates?: Date[]) => void;
}

type DatePickerProps =
  | SingleDatePickerProps
  | RangeDatePickerProps
  | MultipleDatePickerProps;

export function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,
    placeholder = "Select date",
    label,
    className,
    buttonClassName,
    showIcon = true,
    disabled = false,
    required = false,
    fromDate,
    toDate,
    captionLayout = "dropdown",
    numberOfMonths = 1,
    mode = "single",
  } = props;

  const [open, setOpen] = React.useState(false);

  const formatSelectedValue = () => {
    if (!value) return placeholder;

    switch (mode) {
      case "single":
        return format(value as Date, "PPP");
      case "range":
        const range = value as DateRange;
        if (range?.from && range?.to) {
          return `${format(range.from, "MMM d, yyyy")} - ${format(
            range.to,
            "MMM d, yyyy"
          )}`;
        }
        return placeholder;
      case "multiple":
        const dates = value as Date[];
        if (dates?.length > 0) {
          if (dates.length === 1) return format(dates[0], "PPP");
          return `${dates.length} dates selected`;
        }
        return placeholder;
      default:
        return placeholder;
    }
  };

  const handleSelect = (newValue: Date | DateRange | Date[] | undefined) => {
    if (!newValue) {
      onChange(undefined as any); // Type assertion needed due to discriminated union
      return;
    }

    switch (mode) {
      case "single":
        (onChange as (date?: Date) => void)(newValue as Date);
        break;
      case "range":
        (onChange as (range?: DateRange) => void)(newValue as DateRange);
        break;
      case "multiple":
        (onChange as (dates?: Date[]) => void)(newValue as Date[]);
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <Label htmlFor="date-picker" className="px-1 text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              !value && "text-muted-foreground",
              buttonClassName
            )}
          >
            <span className="truncate">{formatSelectedValue()}</span>
            {showIcon ? (
              <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {mode === "range" ? (
            <Calendar
              mode="range"
              selected={value as DateRange}
              onSelect={(range) => {
                handleSelect(range);
              }}
              numberOfMonths={numberOfMonths}
              captionLayout={captionLayout}
              fromDate={fromDate}
              toDate={toDate}
              initialFocus
              required={false} // Add this to satisfy the type requirement
            />
          ) : mode === "multiple" ? (
            <Calendar
              mode="multiple"
              selected={value as Date[]}
              onSelect={(dates) => {
                handleSelect(dates);
              }}
              numberOfMonths={numberOfMonths}
              captionLayout={captionLayout}
              fromDate={fromDate}
              toDate={toDate}
              initialFocus
            />
          ) : (
            <Calendar
              mode="single"
              selected={value as Date}
              onSelect={(date) => {
                handleSelect(date);
                setOpen(false);
              }}
              numberOfMonths={numberOfMonths}
              captionLayout={captionLayout}
              fromDate={fromDate}
              toDate={toDate}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
