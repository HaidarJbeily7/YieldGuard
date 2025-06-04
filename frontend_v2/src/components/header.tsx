import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useWallet } from "@/contexts/near";
import { Link } from "@tanstack/react-router";
import { Shield, BarChart3, User, LogOut, TrendingUp, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { signedAccountId, wallet } = useWallet();

  const handleSignOut = async () => {
    if (wallet) {
      await wallet.signOut();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-2">
        {/* Logo */}
        <div className="mr-8 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Yield Guard
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            to="/"
            className="transition-colors hover:text-primary text-foreground/80 hover:text-foreground"
            activeProps={{
              className: "text-primary font-semibold"
            }}
          >
            Home
          </Link>
          <Link
            to="/markets"
            className="transition-colors hover:text-primary text-foreground/80 hover:text-foreground flex items-center space-x-1"
            activeProps={{
              className: "text-primary font-semibold"
            }}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Markets</span>
          </Link>
          <Link
            to="/dashboard"
            className="transition-colors hover:text-primary text-foreground/80 hover:text-foreground flex items-center space-x-1"
            activeProps={{
              className: "text-primary font-semibold"
            }}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-end justify-end space-x-4">
          <ModeToggle />
          
          {signedAccountId ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-auto px-3 hover:bg-primary/10">
                  <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {signedAccountId}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {signedAccountId}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${signedAccountId}`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild className="hover:bg-primary/10">
                <Link to="/login" className="flex items-center space-x-1">
                  <Wallet className="h-4 w-4" />
                  <span>Connect</span>
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg dark:text-[#212121] hover:shadow-xl transition-all duration-300">
                <Link to="/login" className="px-6">
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
