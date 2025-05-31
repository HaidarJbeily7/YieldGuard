import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/markets")({
  component: MarketsPage
});

// Mock market data
const marketData = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 43250.75,
    change: 2.45,
    changePercent: 0.0567,
    volume: "24.5B",
    marketCap: "845.2B",
    high24h: 43890.12,
    low24h: 42150.33,
    isPositive: true
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 2635.42,
    change: -45.23,
    changePercent: -0.0169,
    volume: "12.8B",
    marketCap: "316.7B",
    high24h: 2695.88,
    low24h: 2598.15,
    isPositive: false
  },
  {
    symbol: "BNB/USD",
    name: "BNB",
    price: 315.67,
    change: 8.92,
    changePercent: 0.0291,
    volume: "1.2B",
    marketCap: "47.3B",
    high24h: 322.45,
    low24h: 308.12,
    isPositive: true
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 98.34,
    change: 5.67,
    changePercent: 0.0612,
    volume: "2.1B",
    marketCap: "42.8B",
    high24h: 102.45,
    low24h: 95.23,
    isPositive: true
  },
  {
    symbol: "ADA/USD",
    name: "Cardano",
    price: 0.4856,
    change: -0.0123,
    changePercent: -0.0247,
    volume: "456M",
    marketCap: "17.2B",
    high24h: 0.4978,
    low24h: 0.4821,
    isPositive: false
  },
  {
    symbol: "NEAR/USD",
    name: "NEAR Protocol",
    price: 3.42,
    change: 0.15,
    changePercent: 0.0459,
    volume: "125M",
    marketCap: "3.6B",
    high24h: 3.58,
    low24h: 3.28,
    isPositive: true
  }
];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="container max-w-screen-2xl px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Markets
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time market data and trading opportunities
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search markets..." 
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="container max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">$2.1T</p>
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">$89.2B</p>
              <p className="text-sm text-muted-foreground">Trading Volume</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">12,847</p>
              <p className="text-sm text-muted-foreground">Active Markets</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Bitcoin</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">52.4%</p>
              <p className="text-sm text-muted-foreground">Dominance</p>
            </div>
          </div>
        </div>

        {/* Markets Table */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Top Markets</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Market</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">24h Change</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">24h Volume</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Market Cap</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((market, index) => (
                  <tr 
                    key={market.symbol} 
                    className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Star className="h-4 w-4" />
                        </Button>
                        <div>
                          <div className="font-semibold text-foreground">{market.symbol}</div>
                          <div className="text-sm text-muted-foreground">{market.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-semibold text-foreground">
                        ${market.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        market.isPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {market.isPositive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {market.isPositive ? '+' : ''}{market.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className={`text-sm ${
                        market.isPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {market.isPositive ? '+' : ''}${market.change.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-medium text-foreground">{market.volume}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-medium text-foreground">{market.marketCap}</div>
                    </td>
                    <td className="p-4 text-right">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Trade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 