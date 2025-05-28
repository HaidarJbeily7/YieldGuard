import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
	dateRange: { from: Date; to: Date };
	setDateRange: React.Dispatch<React.SetStateAction<{ from: Date; to: Date }>>;
	className?: string;
}

export default function DateRangePicker({
	dateRange,
	setDateRange,
	className,
}: DateRangePickerProps) {
	const handleSelect = (date: Date | undefined) => {
		if (!date) return;

		const { from, to } = dateRange;

		if (!from || (from && to)) {
			setDateRange({ from: date, to: date });
		} else if (date < from) {
			setDateRange({ from: date, to: from });
		} else {
			setDateRange({ from, to: date });
		}
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal sm:w-[300px] bg-zinc-800",
							!dateRange && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, "LLL dd, yyyy")} -{" "}
									{format(dateRange.to, "LLL dd, yyyy")}
								</>
							) : (
								format(dateRange.from, "LLL dd, yyyy")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 bg-zinc-900" align="end">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={dateRange?.from}
						selected={{
							from: dateRange?.from,
							to: dateRange?.to,
						}}
						onSelect={(range) => {
							if (range?.from) {
								setDateRange({
									from: range.from,
									to: range.to || range.from,
								});
							}
						}}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
