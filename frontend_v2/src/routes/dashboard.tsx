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
  Eye,
  Plus,
  RefreshCw,
  PieChart,
  Wallet,
  Clock,
  Target
} from "lucide-react";
import { useWallet } from "@/contexts/near";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage
});

// Mock portfolio data
const portfolioData = {
  totalValue: 125847.32,
  dayChange: 3.45,
  dayChangePercent: 2.82,
  totalPnL: 25847.32,
  totalPnLPercent: 25.84
};

const holdings = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: 2.5843,
    value: 111760.85,
    price: 43250.75,
    change: 2.45,
    changePercent: 0.0567,
    allocation: 88.8,
    isPositive: true
  },
  {
    symbol: "ETH",
    name: "Ethereum", 
    amount: 4.2156,
    value: 11108.47,
    price: 2635.42,
    change: -45.23,
    changePercent: -0.0169,
    allocation: 8.8,
    isPositive: false
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    amount: 891.45,
    value: 3048.76,
    price: 3.42,
    change: 0.15,
    changePercent: 0.0459,
    allocation: 2.4,
    isPositive: true
  }
];

const recentTrades = [
  {
    id: 1,
    type: "BUY",
    symbol: "BTC/USD",
    amount: 0.1543,
    price: 43180.50,
    value: 6664.75,
    time: "2 min ago",
    status: "Completed"
  },
  {
    id: 2,
    type: "SELL",
    symbol: "ETH/USD",
    amount: 1.2500,
    price: 2645.80,
    value: 3307.25,
    time: "15 min ago",
    status: "Completed"
  },
  {
    id: 3,
    type: "BUY",
    symbol: "NEAR/USD",
    amount: 125.00,
    price: 3.38,
    value: 422.50,
    time: "1 hour ago",
    status: "Completed"
  }
];

const watchlist = [
  { symbol: "SOL/USD", price: 98.34, change: 5.67, changePercent: 0.0612, isPositive: true },
  { symbol: "ADA/USD", price: 0.4856, change: -0.0123, changePercent: -0.0247, isPositive: false },
  { symbol: "MATIC/USD", price: 0.8945, change: 0.0234, changePercent: 0.0269, isPositive: true },
  { symbol: "DOT/USD", price: 6.78, change: -0.15, changePercent: -0.0217, isPositive: false }
];

export default function DashboardPage() {
  const { signedAccountId, wallet } = useWallet();


  const handleLogin = async () => {
    if (wallet) {
      await wallet.signIn();
    }
  };
  if (!signedAccountId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <Wallet className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Please connect your wallet to access your trading dashboard.
          </p>
          <Button  className="bg-primary hover:bg-primary/90" onClick={handleLogin}>
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-card/20 via-card/30 to-background">
      {/* Header */}
      <div className="border-b border-border/40 ">
        <div className="container max-w-screen-2xl px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back, {signedAccountId}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button className="bg-primary text-[#212121] hover:bg-primary/90 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Trade</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-2xl px-4 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-b from-background via-background to-background/50 rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Portfolio Overview</h2>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-end space-x-4 mb-2">
                  <span className="text-3xl font-bold text-foreground">
                    ${portfolioData.totalValue.toLocaleString()}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    portfolioData.dayChangePercent > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {portfolioData.dayChangePercent > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {portfolioData.dayChangePercent > 0 ? '+' : ''}{portfolioData.dayChangePercent}%
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground">Total Portfolio Value</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-lg font-semibold text-green-500">
                    +${portfolioData.totalPnL.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total P&L (+{portfolioData.totalPnLPercent}%)</p>
                </div>
                <div>
                  <div className={`text-lg font-semibold ${
                    portfolioData.dayChange > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {portfolioData.dayChange > 0 ? '+' : ''}${portfolioData.dayChange.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Positions</span>
                <span className="font-semibold text-foreground">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Today's Trades</span>
                <span className="font-semibold text-foreground">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-green-500">73.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Performer</span>
                <span className="font-semibold text-foreground">BTC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings & Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Holdings */}
          <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl border shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Holdings</h3>
            </div>
            <div className="p-6 space-y-4">
              {holdings.map((holding) => (
                <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{holding.symbol}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.amount} tokens</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${holding.value.toLocaleString()}</div>
                    <div className={`text-sm flex items-center justify-end space-x-1 ${
                      holding.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {holding.isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span>{holding.isPositive ? '+' : ''}{holding.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl border shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Recent Trades</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type === 'BUY' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {trade.type}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{trade.symbol}</div>
                      <div className="text-sm text-muted-foreground">{trade.amount} @ ${trade.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${trade.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{trade.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-gradient-to-b from-background via-background to-background/50rounded-xl border shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Watchlist</h3>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {watchlist.map((item) => (
                <div key={item.symbol} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{item.symbol}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Target className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">${item.price}</div>
                    <div className={`text-sm flex items-center space-x-1 ${
                      item.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span>{item.isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 