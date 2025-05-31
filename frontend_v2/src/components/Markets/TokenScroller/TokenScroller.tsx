import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export interface Token {
	id: string;
	name: string;
	symbol: string;
	price: number;
	change: number;
	iconUrl?: string;
}

interface TokenScrollerProps {
	tokens: Token[];
	selectedId?: string;
	onSelect?: (id: string) => void;
}

const TokenScroller: React.FC<TokenScrollerProps> = ({
	tokens,
	selectedId,
	onSelect,
}) => {
	const [startIndex, setStartIndex] = useState(0);
	const visibleCount = 7;

	const visibleTokens = Array.from({ length: visibleCount }).map((_, i) => {
		const index = (startIndex + i) % tokens.length;
		return tokens[index];
	});

	const handleNext = () => {
		setStartIndex((prev) => (prev + 1) % tokens.length);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				{/* Top row - 4 cards */}
				{visibleTokens.slice(0, 4).map((token) => (
					<Card
						key={token.id}
						onClick={() => onSelect?.(token.id)}
						className={cn(
							"col-span-1 w-full cursor-pointer p-2 rounded-3xl min-w-[200px]",
							"transition-transform duration-500 ease-in-out animate-slidein",
							token.id === selectedId
								? "border-primary bg-stone-800"
								: "border-border bg-background hover:bg-accent",
						)}
					>
						<CardContent className="flex items-center space-x-3 px-4 py-2">
							<Avatar>
								<AvatarImage src={token.iconUrl} alt={token.symbol} />
							</Avatar>
							<div className="flex-1 space-y-0.5">
								<div className="flex items-center justify-between">
									<span className="font-medium">{token.name}</span>

									<span
										className={cn(
											"font-medium",
											token.change >= 0 ? "text-green-500" : "text-red-500",
										)}
									>
										{token.change >= 0
											? `+${token.change.toFixed(2)}%`
											: `${token.change.toFixed(2)}%`}
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									${token.price.toLocaleString()}
								</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Bottom row - 3 cards */}
			<div className="flex gap-4">
				{visibleTokens.slice(4, 7).map((token) => (
					<Card
						key={token.id}
						onClick={() => onSelect?.(token.id)}
						className={cn(
							"col-span-1 w-full p-2 cursor-pointer rounded-3xl max-w-96",
							"transition-transform duration-500 ease-in-out animate-slidein",
							token.id === selectedId
								? "border-primary bg-primary/10"
								: "border-border bg-background hover:bg-accent",
						)}
					>
						<CardContent className="flex items-center space-x-3 px-4 py-2">
							<Avatar>
								<AvatarImage src={token.iconUrl} alt={token.symbol} />
							</Avatar>
							<div className="flex-1 space-y-0.5">
								<div className="flex items-center justify-between">
									<span className="font-medium">{token.name}</span>
									<span
										className={cn(
											"font-medium",
											token.change >= 0 ? "text-green-500" : "text-red-500",
										)}
									>
										{token.change >= 0
											? `+${token.change.toFixed(2)}%`
											: `${token.change.toFixed(2)}%`}
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									${token.price.toLocaleString()}
								</p>
							</div>
						</CardContent>
					</Card>
				))}

				{/* Arrow Button */}
				<div className="items-center justify-center">
					<Button
						variant="ghost"
						onClick={handleNext}
						className="w-full h-full bg-background rounded-3xl hover:bg-accent max-w-24"
					>
						<ChevronRight className="h-8 w-8" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TokenScroller;
