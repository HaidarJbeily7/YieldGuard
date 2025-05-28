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

interface AlertsPanelProps {
	isOpen: boolean;
	onToggle: () => void;
}

const AlertsPanel = ({ isOpen, onToggle }: AlertsPanelProps) => {
	return (
		<div
			className={cn(
				"fixed right-0 top-0 h-screen bg-[#121212] border-l border-border transition-all duration-300 z-20",
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
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="default" id="default" />
										<Label htmlFor="default">Default</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="comfortable" id="comfortable" />
										<Label htmlFor="comfortable">Comfortable</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="compact" id="compact" />
										<Label htmlFor="compact">Compact</Label>
									</div>
								</RadioGroup>
							</div>

							<Collapsible>
								<CollapsibleTrigger className="flex w-full items-center justify-between py-2">
									<span className="text-sm font-medium">Filter Alerts</span>
								</CollapsibleTrigger>
								<CollapsibleContent className="space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox id="current-symbol" />
										<Label htmlFor="current-symbol">Current symbol</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox id="time-interval" />
										<Label htmlFor="time-interval">Current time interval</Label>
									</div>
								</CollapsibleContent>
							</Collapsible>

							<Collapsible>
								<CollapsibleTrigger className="flex w-full items-center justify-between py-2">
									<span className="text-sm font-medium">
										Show alerts by type
									</span>
								</CollapsibleTrigger>
								<CollapsibleContent className="space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox id="price" />
										<Label htmlFor="price">Price</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox id="technicals" />
										<Label htmlFor="technicals">Technicals</Label>
									</div>
									<div className="flex items-center space-x-2">
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

// CHATGPT IMPLEMENTATION
// import { BellIcon, SearchIcon, Settings2Icon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { cn } from '@/lib/utils';

// interface AlertsPanelProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const AlertsPanel = ({ isOpen, onToggle }: AlertsPanelProps) => {
//   return (
//     <div className={cn(
//       "fixed right-0 top-0 h-screen bg-[#1a1a1a] border-l border-border transition-all duration-300 z-20 text-white",
//       isOpen ? "w-[260px]" : "w-[48px]"
//     )}>
//       <div className="flex flex-col h-full">
//         {/* Header */}
//         <div className="p-3 border-b border-[#333] flex items-center justify-between">
//           {isOpen ? (
//             <>
//               <div className="flex items-center gap-2">
//                 <BellIcon className="h-5 w-5" />
//                 <span className="font-semibold">Alerts</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button variant="ghost" size="icon">
//                   <SearchIcon className="h-4 w-4" />
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <Settings2Icon className="h-4 w-4" />
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <Button variant="ghost" size="icon" onClick={onToggle} className="w-full">
//               <BellIcon className="h-5 w-5" />
//             </Button>
//           )}
//         </div>

//         {/* Content */}
//         {isOpen && (
//           <div className="p-4 space-y-6 overflow-y-auto flex-1">
//             {/* Show Alerts */}
//             <div className="space-y-2">
//               <Label className="text-sm text-muted-foreground">Show alerts</Label>
//               <RadioGroup defaultValue="comfortable" className="space-y-2">
//                 {["default", "comfortable", "compact"].map((type) => (
//                   <label
//                     key={type}
//                     htmlFor={type}
//                     className="flex items-center gap-2 p-2 rounded bg-[#0f0f0f] hover:bg-[#2a2a2a] cursor-pointer"
//                   >
//                     <RadioGroupItem value={type} id={type} />
//                     <span className="capitalize">{type}</span>
//                   </label>
//                 ))}
//               </RadioGroup>
//             </div>

//             {/* Filter Alerts */}
//             <div className="space-y-2">
//               <Label className="text-sm text-muted-foreground">Filter Alerts</Label>
//               {[
//                 { id: "current-symbol", label: "Current symbol" },
//                 { id: "current-interval", label: "Current time interval" },
//               ].map(({ id, label }) => (
//                 <label
//                   key={id}
//                   htmlFor={id}
//                   className="flex items-center gap-2 p-2 rounded bg-[#0f0f0f] hover:bg-[#2a2a2a] cursor-pointer"
//                 >
//                   <Checkbox id={id} />
//                   <span>{label}</span>
//                 </label>
//               ))}
//             </div>

//             {/* Show alerts by type */}
//             <div className="space-y-2">
//               <Label className="text-sm text-muted-foreground">Show alerts by type</Label>
//               {["Price", "Technicals", "Watchlist"].map((label) => (
//                 <label
//                   key={label}
//                   htmlFor={label.toLowerCase()}
//                   className="flex items-center gap-2 p-2 rounded bg-[#0f0f0f] hover:bg-[#2a2a2a] cursor-pointer"
//                 >
//                   <Checkbox id={label.toLowerCase()} />
//                   <span>{label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlertsPanel;
