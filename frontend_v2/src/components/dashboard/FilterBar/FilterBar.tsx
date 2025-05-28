import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { CheckIcon, Trash2 } from "lucide-react";

const watchListOption = ["Red List"];

const volumeOptions = [
	"10 M USD and above",
	"1 M USD and above",
	"500 K USD and above",
	"100 K USD and above",
	"10 K USD and above",
];
const changeOptions = [
	"30% and above",
	"20% and above",
	"10% and above",
	"5% and above",
	"0% to 5%",
	"0% and above",
	"0% and below",
];
const txOptions = [
	"1 K and above",
	"100 and above",
	"10 and above",
	"1 and above",
];

const FilterBar = () => {
	const [volume, setVolume] = useState(volumeOptions[0]);
	const [change, setChange] = useState(changeOptions[0]);
	const [tx, setTx] = useState(txOptions[0]);
	const [watchlist, setWatchlist] = useState(watchListOption[0]);

	return (
		<div className="flex items-center flex-wrap gap-2">
			<p className="mr-2">Filters</p>

			{/* Watchlist */}

			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="bg-stone-800 hover:bg-stone-900 h-9 text-xs md:text-sm"
					>
						Watchlist
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px] p-1 bg-stone-900">
					<Command className="bg-stone-900">
						<CommandList>
							<CommandGroup heading="Flagged lists">
								<div className=" border-t border-stone-700 my-1 mx-2" />

								{watchListOption.map((option) => (
									<CommandItem
										key={option}
										onSelect={() => setWatchlist(option)}
										className="cursor-pointer"
									>
										{option}
										{watchlist === option && (
											<CheckIcon className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								))}
							</CommandGroup>

							<CommandItem
								onSelect={() => setWatchlist(changeOptions[0])}
								className="cursor-pointer"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Reset
							</CommandItem>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Change Dropdown */}
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="bg-stone-800 hover:bg-stone-900 h-9 text-xs md:text-sm"
					>
						{`Change: ${change}`}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px] p-1 bg-stone-900">
					<Command className="bg-stone-900">
						<CommandList>
							<CommandGroup heading="Price change % 24 hours">
								<div className=" border-t border-stone-700 my-1 mx-2" />

								{changeOptions.map((option) => (
									<CommandItem
										key={option}
										onSelect={() => setChange(option)}
										className="cursor-pointer "
									>
										{option}
										{change === option && (
											<CheckIcon className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								))}
							</CommandGroup>

							<CommandItem
								onSelect={() => setChange(changeOptions[0])}
								className="cursor-pointer"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Reset
							</CommandItem>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Volume Dropdown */}
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="bg-stone-800 hover:bg-stone-900 h-9 text-xs md:text-sm"
					>
						{`Volume: ${volume}`}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px] p-1 bg-stone-900">
					<Command className="bg-stone-900">
						<CommandList>
							<CommandGroup heading="Trading volume 24 hours">
								<div className=" border-t border-stone-700 my-1 mx-2" />

								{volumeOptions.map((option) => (
									<CommandItem
										key={option}
										onSelect={() => setVolume(option)}
										className="cursor-pointer"
									>
										{option}
										{volume === option && (
											<CheckIcon className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
							<div className=" border-t border-stone-700 my-1 mx-2" />

							<CommandItem
								onSelect={() => setVolume(volumeOptions[0])}
								className="cursor-pointer"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Reset
							</CommandItem>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* Transactions Dropdown */}
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="bg-stone-800 hover:bg-stone-900 h-9 text-xs md:text-sm"
					>
						{`Transactions: ${tx}`}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[220px]  p-1 bg-stone-900">
					<Command className="bg-stone-900">
						<CommandList>
							<CommandGroup heading="Transactions 24 hours">
								<div className=" border-t border-stone-700 my-1 mx-2" />
								{txOptions.map((option) => (
									<CommandItem
										key={option}
										onSelect={() => setTx(option)}
										className="cursor-pointer"
									>
										{option}
										{tx === option && <CheckIcon className="ml-auto h-4 w-4" />}
									</CommandItem>
								))}
							</CommandGroup>
							<div className=" border-t border-stone-700 my-1 mx-2" />
							<CommandItem
								onSelect={() => setTx(txOptions[0])}
								className="cursor-pointer"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Reset
							</CommandItem>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FilterBar;
