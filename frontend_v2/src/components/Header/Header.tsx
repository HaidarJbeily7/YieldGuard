import { ShieldIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<header className="bg-[#0C0A09] border-b border-border sticky top-0 z-10 mr-[68px]">
			<div className="w-full mx-auto px-4 py-4 max-w-[1600px]">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center space-x-8">
						<div className="flex items-center shrink-0">
							<ShieldIcon className="h-8 w-8 mr-2" />
						</div>

						<div className="flex items-center">
							<Link to="/">
								<Button
									variant="link"
									className={`hidden lg:block no-underline hover:no-underline ${
										currentPath === "/" ? "text-white" : "text-zinc-400"
									}`}
								>
									Overview
								</Button>
							</Link>
							<Link to="/markets">
								<Button
									variant="link"
									className={`hidden lg:block no-underline hover:no-underline ${
										currentPath === "/markets" ? "text-white" : "text-zinc-400"
									}`}
								>
									Markets
								</Button>
							</Link>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="relative w-[300px]">
							<Input placeholder="Search..." className="bg-card" />
						</div>

						<Avatar className="h-8 w-8 border border-border shrink-0 cursor-pointer">
							<div className="bg-primary-foreground text-primary rounded-full h-full w-full flex items-center justify-center">
								<span className="text-sm font-medium">P</span>
							</div>
						</Avatar>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
