import {
	BellIcon,
	SearchIcon,
	Settings2Icon,
	MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

interface AlertsPanelProps {
	isOpen: boolean;
	onToggle: () => void;
}

const AlertsPanel = ({ isOpen, onToggle }: AlertsPanelProps) => {
	return (
		<div
			className={cn(
				"fixed right-0 top-0 h-screen bg-stone-800 border-l border-border transition-all duration-300 z-20",
				isOpen ? "w-[300px]" : "w-[68px]",
			)}
		>
			<div className="flex flex-col h-full">
				{/* Header */}
				<div className="p-3 flex items-center justify-between">
					{isOpen ? (
						<>
							<div className="flex items-center gap-2">
								<BellIcon className="h-5 w-5" />
								<span className="font-medium">Alerts</span>
							</div>
							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon" onClick={onToggle}>
									<SearchIcon className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" onClick={onToggle}>
									<Settings2Icon className="h-4 w-4" />
								</Button>
							</div>
						</>
					) : (
						<div className="flex flex-col gap-6 items-center justify-center w-full">
							<Button
								variant="ghost"
								size="icon"
								onClick={onToggle}
								className="w-full"
							>
								<BellIcon className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={onToggle}
								className="w-full"
							>
								<MessageCircle className="h-5 w-5" />
							</Button>
						</div>
					)}
				</div>

				{/* Content - Only shown when panel is open */}
				{isOpen && (
					<div className="p-4 space-y-6 overflow-y-auto flex-1">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Show alerts</Label>
								<RadioGroup defaultValue="comfortable">
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<RadioGroupItem value="default" id="default" />
										<Label htmlFor="default">Default</Label>
									</div>
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<RadioGroupItem value="comfortable" id="comfortable" />
										<Label htmlFor="comfortable">Comfortable</Label>
									</div>
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<RadioGroupItem value="compact" id="compact" />
										<Label htmlFor="compact">Compact</Label>
									</div>
								</RadioGroup>
							</div>

							<Collapsible defaultOpen>
								<CollapsibleTrigger className="flex w-full items-center hover:bg-stone-900 justify-between py-2">
									<span className="text-sm font-medium">Filter Alerts</span>
									<ChevronsUpDown className="w-4" />
								</CollapsibleTrigger>
								<CollapsibleContent className="space-y-2">
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<Checkbox id="current-symbol" />
										<Label htmlFor="current-symbol">Current symbol</Label>
									</div>
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<Checkbox id="time-interval" />
										<Label htmlFor="time-interval">Current time interval</Label>
									</div>
								</CollapsibleContent>
							</Collapsible>

							<Collapsible defaultOpen>
								<CollapsibleTrigger className="flex w-full items-center justify-between py-2">
									<span className="text-sm font-medium">
										Show alerts by type
									</span>
									<ChevronsUpDown className="w-4" />
								</CollapsibleTrigger>
								<CollapsibleContent className="space-y-2">
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<Checkbox id="price" />
										<Label htmlFor="price">Price</Label>
									</div>
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<Checkbox id="technicals" />
										<Label htmlFor="technicals">Technicals</Label>
									</div>
									<div className="flex bg-stone-950 p-4 rounded-md items-center space-x-2">
										<Checkbox id="watchlist" />
										<Label htmlFor="watchlist">Watchlist</Label>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AlertsPanel;
