import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  RefreshCw,
  PieChart,
  Wallet,
  Clock,
  Target,
  Brain,
  Droplets,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
} from "lucide-react";
import { useWallet } from "@/contexts/near";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export const Route = createFileRoute("/dashboard")({
  component: DashboardPage
});

// API base URL
const API_BASE = "https://backend-patient-thunder-8746.fly.dev/api/dashboard";

// Optimization enums (matching backend)
enum OptimizationGoal {
  MAXIMIZE_PROFIT = 'MAXIMIZE_PROFIT',
  MINIMIZE_RISK = 'MINIMIZE_RISK',
  BALANCED = 'BALANCED',
  YIELD_FARMING = 'YIELD_FARMING',
  ARBITRAGE = 'ARBITRAGE',
}

enum TimeHorizon {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM', 
  LONG_TERM = 'LONG_TERM',
}

// Type definitions that match the backend service interfaces
interface PortfolioData {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalPnL: number;
  totalPnLPercent: number;
}

interface Holding {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  change: number;
  changePercent: number;
  allocation: number;
  isPositive: boolean;
}

interface Trade {
  id: number;
  type: 'BUY' | 'SELL';
  symbol: string;
  amount: number;
  price: number;
  value: number;
  time: string;
  status: string;
  dex: string;
}

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  targetPrice?: number;
}

interface NearPool {
  id: string;
  symbol: string;
  tvl: number;
  apy: number;
  volume24h: number;
  dex: string;
  tokens: string[];
  isStable: boolean;
}

interface QuickStats {
  activePositions: number;
  todayTrades: number;
  winRate: number;
  bestPerformer: string;
}

interface LLMSuggestion {
  action: 'BUY' | 'SELL' | 'PROVIDE_LIQUIDITY' | 'STAKE';
  symbol: string;
  amount: number;
  expectedReturn: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reasoning: string;
  dex: string;
  priority: number;
}

// API client with authentication
const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwt_token'); // Assuming JWT is stored in localStorage
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export default function DashboardPage() {
  const { signedAccountId, wallet } = useWallet();
  
  // State for API data
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [nearPools, setNearPools] = useState<NearPool[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats | null>(null);
  const [llmSuggestions, setLlmSuggestions] = useState<LLMSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state for NEAR pools
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 pools per page

  // Calculate pagination for NEAR pools
  const totalPages = Math.ceil(nearPools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPools = nearPools.slice(startIndex, endIndex);

  // Reset to first page when pools data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [nearPools.length]);

  // Optimization modal state
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  const [optimizeParams, setOptimizeParams] = useState({
    amount: 1000,
    goal: OptimizationGoal.BALANCED,
    timeHorizon: TimeHorizon.MEDIUM_TERM,
    riskTolerance: 6,
    preferredAssets: ['NEAR', 'USDC', 'ETH'],
    excludeDexs: [] as string[],
    maxTrades: 3
  });

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!signedAccountId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [
        portfolioResponse,
        holdingsResponse,
        tradesResponse,
        watchlistResponse,
        poolsResponse,
        statsResponse
      ] = await Promise.all([
        apiClient(`/portfolio?accountId=${signedAccountId}`),
        apiClient(`/holdings?accountId=${signedAccountId}`),
        apiClient(`/trades/recent?accountId=${signedAccountId}`),
        apiClient(`/watchlist?accountId=${signedAccountId}`),
        apiClient(`/pools/near?accountId=${signedAccountId}`),
        apiClient(`/stats?accountId=${signedAccountId}`),
      ]);

      console.log('Portfolio Response:', portfolioResponse);
      console.log('Holdings Response:', holdingsResponse);
      console.log('Trades Response:', tradesResponse);
      console.log('Watchlist Response:', watchlistResponse);
      console.log('Pools Response:', poolsResponse);
      console.log('Stats Response:', statsResponse);

      setPortfolioData(portfolioResponse);
      setHoldings(holdingsResponse);
      setRecentTrades(tradesResponse);
      setWatchlist(watchlistResponse);
      setNearPools(poolsResponse);
      setQuickStats(statsResponse);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Dashboard API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and account change
  useEffect(() => {
    if (signedAccountId) {
      fetchDashboardData();
    }
  }, [signedAccountId]);

  const handleLogin = async () => {
    if (wallet) {
      await wallet.signIn();
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleOptimize = async () => {
    try {
      const optimizeResponse = await apiClient('/trades/optimize', {
        method: 'POST',
        body: JSON.stringify({
          accountId: signedAccountId,
          amount: 1000,
          goal: "MAXIMIZE_PROFIT",
          timeHorizon: "SHORT_TERM",
          riskTolerance: 7,
          preferredAssets: ["NEAR", "USDC", "ETH", "AURORA"],
          maxTrades: 3
        })
      });
      setLlmSuggestions(optimizeResponse);
    } catch (err) {
      console.error('Optimization Error:', err);
    }
  };

  const handleOptimizeWithParams = async () => {
    setOptimizeLoading(true);
    try {
      const optimizeResponse = await apiClient('/trades/optimize', {
        method: 'POST',
        body: JSON.stringify({
          accountId: signedAccountId,
          amount: optimizeParams.amount,
          goal: optimizeParams.goal,
          timeHorizon: optimizeParams.timeHorizon,
          riskTolerance: optimizeParams.riskTolerance,
          preferredAssets: optimizeParams.preferredAssets,
          excludeDexs: optimizeParams.excludeDexs,
          maxTrades: optimizeParams.maxTrades
        })
      });
      setLlmSuggestions(optimizeResponse);
      setOptimizeModalOpen(false);
    } catch (err) {
      console.error('Optimization Error:', err);
    } finally {
      setOptimizeLoading(false);
    }
  };

  const handleAddToWatchlist = async (symbol: string, targetPrice: number) => {
    try {
      await apiClient('/watchlist', {
        method: 'POST',
        body: JSON.stringify({
          accountId: signedAccountId,
          symbol,
          targetPrice
        })
      });
      // Refresh watchlist
      const watchlistResponse = await apiClient(`/watchlist?accountId=${signedAccountId}`);
      setWatchlist(watchlistResponse);
    } catch (err) {
      console.error('Add to Watchlist Error:', err);
    }
  };

  if (!signedAccountId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <Wallet className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your NEAR Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Please connect your NEAR wallet to access your trading dashboard and start trading on NEAR DEXs.
          </p>
          <Button className="bg-primary hover:bg-primary/90" onClick={handleLogin}>
            Connect NEAR Wallet
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your NEAR dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-red-500/10 rounded-full w-fit mx-auto mb-6">
            <Activity className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Connection Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={handleRefresh} className="bg-primary hover:bg-primary/90">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-card/20 via-card/30 to-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                NEAR Trading Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back, {signedAccountId}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleRefresh} className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button onClick={() => setOptimizeModalOpen(true)} className="bg-primary text-[#212121] hover:bg-primary/90 flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>AI Optimize</span>
              </Button>
              <Button className="bg-primary text-[#212121] hover:bg-primary/90 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Trade</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        {/* Portfolio Overview */}
        {portfolioData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-gradient-to-b from-background via-background to-background/50 rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">NEAR Portfolio Overview</h2>
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

            {quickStats && (
              <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Positions</span>
                    <span className="font-semibold text-foreground">{quickStats.activePositions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Today's Trades</span>
                    <span className="font-semibold text-foreground">{quickStats.todayTrades}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-semibold text-green-500">{quickStats.winRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Best Performer</span>
                    <span className="font-semibold text-foreground">{quickStats.bestPerformer}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LLM Suggestions */}
        {llmSuggestions.length > 0 && (
          <div className="mb-8 bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Trade Suggestions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Personalized recommendations for optimal trading</p>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold">
                  {llmSuggestions.length} Active
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleOptimize} className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {llmSuggestions.map((suggestion, index) => (
                  <div key={index} className="relative bg-white dark:bg-background/50 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    
                    {/* Priority Badge */}
                    <div className="absolute -top-3 -right-3">
                      <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        suggestion.priority === 1 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border border-yellow-300' 
                          : suggestion.priority === 2
                          ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-blue-900 border border-blue-300'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900 border border-gray-300'
                      }`}>
                        Priority #{suggestion.priority}
                      </div>
                    </div>

                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        {/* Action Icon */}
                        <div className={`p-4 rounded-2xl shadow-lg ${
                          suggestion.action === 'BUY' 
                            ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                            : suggestion.action === 'SELL'
                            ? 'bg-gradient-to-br from-red-400 to-red-600 text-white'
                            : suggestion.action === 'PROVIDE_LIQUIDITY'
                            ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                            : 'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
                        }`}>
                          {suggestion.action === 'BUY' && <TrendingUp className="h-8 w-8" />}
                          {suggestion.action === 'SELL' && <TrendingDown className="h-8 w-8" />}
                          {suggestion.action === 'PROVIDE_LIQUIDITY' && <Droplets className="h-8 w-8" />}
                          {suggestion.action === 'STAKE' && <Target className="h-8 w-8" />}
                        </div>
                        
                        {/* Action Details */}
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-4 py-2 rounded-xl text-base font-bold shadow-sm ${
                              suggestion.action === 'BUY' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : suggestion.action === 'SELL'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : suggestion.action === 'PROVIDE_LIQUIDITY'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            }`}>
                              {suggestion.action.replace('_', ' ')}
                            </span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{suggestion.symbol}</span>
                          </div>
                          <div className="text-base text-gray-700 dark:text-gray-300">
                            Amount: <span className="font-bold text-gray-900 dark:text-white">${suggestion.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expected Return */}
                      <div className="text-right bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
                        <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-1">
                          +{suggestion.expectedReturn}%
                        </div>
                        <div className="text-sm font-medium text-green-700 dark:text-green-300">Expected Return</div>
                      </div>
                    </div>

                    {/* Risk & DEX Info */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-sm ${
                            suggestion.risk === 'LOW' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700' 
                              : suggestion.risk === 'MEDIUM'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700'
                          }`}>
                            {suggestion.risk === 'LOW' && <CheckCircle className="h-4 w-4" />}
                            {suggestion.risk === 'MEDIUM' && <AlertTriangle className="h-4 w-4" />}
                            {suggestion.risk === 'HIGH' && <AlertTriangle className="h-4 w-4" />}
                            <span className="font-bold">Risk: {suggestion.risk}</span>
                          </div>
                          <div className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full border border-blue-300 dark:border-blue-700 font-bold">
                            via {suggestion.dex}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">AI Analysis</span>
                      </div>
                      <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-xl border-l-4 border-primary shadow-sm">
                        <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                          {suggestion.reasoning}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Info className="h-4 w-4" />
                        <span className="font-medium">Based on current market analysis</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" className="font-semibold">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className={`font-bold text-white shadow-lg hover:shadow-xl transition-all ${
                            suggestion.action === 'BUY' 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                              : suggestion.action === 'SELL'
                              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                              : 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary'
                          }`}
                        >
                          {suggestion.action === 'BUY' && <TrendingUp className="h-4 w-4 mr-2" />}
                          {suggestion.action === 'SELL' && <TrendingDown className="h-4 w-4 mr-2" />}
                          {suggestion.action === 'PROVIDE_LIQUIDITY' && <Droplets className="h-4 w-4 mr-2" />}
                          {suggestion.action === 'STAKE' && <Target className="h-4 w-4 mr-2" />}
                          Execute {suggestion.action.replace('_', ' ')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary Footer */}
              <div className="mt-8 p-5 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {llmSuggestions.length} Optimization{llmSuggestions.length !== 1 ? 's' : ''} Generated
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tailored to your preferences and risk profile
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setOptimizeModalOpen(true)} className="font-semibold">
                    <Settings className="h-4 w-4 mr-2" />
                    Adjust Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Holdings & NEAR Pools */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Holdings */}
          {holdings.length > 0 && (
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
                        <div className="text-sm text-muted-foreground">{holding.amount} {holding.symbol}</div>
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
                        <span>{holding.isPositive ? '+' : ''}{(holding.changePercent * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEAR Pools */}
          {nearPools.length > 0 && (
            <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl border shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">NEAR Pools</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {currentPools.map((pool) => (
                  <div key={pool.id} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground">{pool.symbol}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{pool.dex}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-500">{pool.apy}% APY</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">TVL: </span>
                        <span className="font-medium">${(pool.tvl / 1000000).toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">24h Vol: </span>
                        <span className="font-medium">${(pool.volume24h / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {nearPools.length > itemsPerPage && (
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(endIndex, nearPools.length)} of {nearPools.length} pools
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Trades & Watchlist */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Recent Trades */}
          <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl border shadow-sm">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Recent NEAR Trades</h3>
            </div>
            <div className="p-6">
              {recentTrades.length > 0 ? (
                <div className="space-y-4">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center space-x-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.type === 'BUY' 
                            ? 'bg-green-500/10 text-green-500' 
                            : trade.type === 'SELL'
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {trade.type.replace('_', ' ')}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{trade.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {trade.amount} @ ${trade.price} • {trade.dex}
                          </div>
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
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">No Recent Trades</h4>
                  <p className="text-sm text-muted-foreground">Your recent NEAR trades will appear here once you start trading.</p>
                </div>
              )}
            </div>
          </div>

          {/* Watchlist */}
          <div className="bg-gradient-to-b from-background via-background to-background/50 rounded-xl border shadow-sm">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Watchlist</h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
            <div className="p-6">
              {watchlist.length > 0 ? (
                <div className="space-y-4">
                  {watchlist.map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-foreground">{item.symbol}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Target className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">${item.price}</div>
                        <div className={`text-sm flex items-center justify-end space-x-1 ${
                          item.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {item.isPositive ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          <span>{item.isPositive ? '+' : ''}{(item.changePercent * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">No Watchlist Items</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add assets to your watchlist to track their performance.</p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Asset
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trade Optimization Modal */}
      <Dialog open={optimizeModalOpen} onOpenChange={setOptimizeModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI Trade Optimization</span>
            </DialogTitle>
            <DialogDescription>
              Configure your optimization parameters to get personalized AI trade suggestions for NEAR ecosystem.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Investment Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Investment Amount (USD)</label>
              <input
                type="number"
                value={optimizeParams.amount}
                onChange={(e) => setOptimizeParams(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                placeholder="1000"
              />
            </div>

            {/* Optimization Goal */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Optimization Goal</label>
              <select
                value={optimizeParams.goal}
                onChange={(e) => setOptimizeParams(prev => ({ ...prev, goal: e.target.value as OptimizationGoal }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value={OptimizationGoal.BALANCED}>🎯 Balanced (Risk/Reward)</option>
                <option value={OptimizationGoal.MAXIMIZE_PROFIT}>📈 Maximize Profit</option>
                <option value={OptimizationGoal.MINIMIZE_RISK}>🛡️ Minimize Risk</option>
                <option value={OptimizationGoal.YIELD_FARMING}>🌾 Yield Farming</option>
                <option value={OptimizationGoal.ARBITRAGE}>⚡ Arbitrage</option>
              </select>
            </div>

            {/* Time Horizon */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Horizon</label>
              <select
                value={optimizeParams.timeHorizon}
                onChange={(e) => setOptimizeParams(prev => ({ ...prev, timeHorizon: e.target.value as TimeHorizon }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value={TimeHorizon.SHORT_TERM}>⚡ Short Term (&lt; 1 day)</option>
                <option value={TimeHorizon.MEDIUM_TERM}>📅 Medium Term (1-7 days)</option>
                <option value={TimeHorizon.LONG_TERM}>📈 Long Term (&gt; 7 days)</option>
              </select>
            </div>

            {/* Risk Tolerance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Tolerance: {optimizeParams.riskTolerance}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={optimizeParams.riskTolerance}
                onChange={(e) => setOptimizeParams(prev => ({ ...prev, riskTolerance: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Preferred Assets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Assets</label>
              <div className="grid grid-cols-3 gap-2">
                {['NEAR', 'USDC', 'ETH', 'USDT', 'AURORA', 'wBTC'].map((asset) => (
                  <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optimizeParams.preferredAssets.includes(asset)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOptimizeParams(prev => ({ 
                            ...prev, 
                            preferredAssets: [...prev.preferredAssets, asset] 
                          }));
                        } else {
                          setOptimizeParams(prev => ({ 
                            ...prev, 
                            preferredAssets: prev.preferredAssets.filter(a => a !== asset) 
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{asset}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Trades */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Trades: {optimizeParams.maxTrades}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={optimizeParams.maxTrades}
                onChange={(e) => setOptimizeParams(prev => ({ ...prev, maxTrades: Number(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setOptimizeModalOpen(false)}
                disabled={optimizeLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleOptimizeWithParams}
                disabled={optimizeLoading}
                className="bg-primary text-[#212121] hover:bg-primary/90"
              >
                {optimizeLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Get AI Suggestions
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 