import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallet } from "@/contexts/near";
import { useWriteMessage } from "@/lib/guestbook";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp, DollarSign, Activity, Sparkles, Globe, Lock, Star, Users, CheckCircle, Quote, Mail, Phone, MapPin, Github, Twitter, Linkedin, ChevronDown, LogIn } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage
});

// Mock data for additional sections
const testimonials = [
  {
    name: "CiCicharts",
    role: "Memecoin Trader",
    company: "@CiCicharts",
    avatar: "CC",
    rating: 5,
    content: "Finally a trading platform that doesn't eat me alive with gas fees 😅 NEAR's like 0.001 per tx vs the $50+ I was paying on ETH. Actually profitable to swing trade now!"
  },
  {
    name: "LJC", 
    role: "Crypto Trader",
    company: "@OnlyLJC", 
    avatar: "LJ",
    rating: 5,
    content: "The 1-3 sec transaction times are *chef's kiss* 👌 No more waiting 10 mins wondering if my trade went through. NEAR ecosystem is underrated fr"
  },
  {
    name: "CallMaster3k",
    role: "DeFi Trader",
    company: "@callmaster3k",
    avatar: "CM", 
    rating: 4,
    content: "Love that I can connect my NEAR wallet directly. Interface is clean and doesn't overwhelm me with 100 indicators I don't understand. Perfect for someone who's not a trading pro"
  }
];

const stats = [
  { value: "$25k+", label: "Total Volume Traded" },
  { value: "105+", label: "Active Traders" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];

const faqs = [
  {
    question: "What cryptocurrencies can I trade on NEAR Protocol?",
    answer: "You can trade NEAR tokens, Aurora ecosystem tokens (ETH, USDC, USDT), and various NEP-141 tokens native to NEAR. We also support cross-chain bridged assets from Ethereum and other networks through Rainbow Bridge integration."
  },
  {
    question: "How do gas fees work for trading on NEAR?",
    answer: "NEAR transactions cost approximately 0.0001-0.001 NEAR per transaction (~$0.0001-0.001), making it extremely cost-effective. Gas fees are predictable and much lower than Ethereum, enabling frequent trading without prohibitive costs."
  },
  {
    question: "Is my NEAR wallet compatible with Yield Guard?",
    answer: "Yes! We support all major NEAR wallets including NEAR Wallet, MyNearWallet, HERE Wallet, Meteor Wallet, and hardware wallets like Ledger. We also support Ethereum wallets through Aurora integration."
  },
  {
    question: "How fast are transactions on NEAR Protocol?",
    answer: "NEAR processes transactions in 1-3 seconds with finality. This enables near-instant trading execution, real-time portfolio updates, and seamless user experience compared to slower blockchain networks."
  },
  {
    question: "What about cross-chain trading?",
    answer: "Through Aurora and Rainbow Bridge, you can seamlessly trade between NEAR and Ethereum ecosystems. Bridge assets, trade Aurora-based tokens, and access the full DeFi ecosystem with low fees and fast execution."
  }
];

export default function HomePage() {
  const { signedAccountId, wallet } = useWallet();
  const { mutateAsync, isPending } = useWriteMessage();
  const navigate = useNavigate();
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const handleLogin = async () => {
    if (wallet) {
      await wallet.signIn();
    }
  };

  const handleWhitelistClick = () => {
    if (signedAccountId) {
      setShowDonationDialog(true);
    }
  };

  const handleDonationSubmit = async () => {
    if (signedAccountId) {
      try {
        await mutateAsync({
          message: signedAccountId,
          donationAmount: donationAmount || "0"
        });
        setShowDonationDialog(false);
        setDonationAmount("");
      } catch (error) {
        console.error("Error submitting whitelist request:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        {/* Gradient overlays for depth */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    Yield Guard
                  </h1>
                  <div className="absolute -top-2 -right-8 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                    BETA
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Professional Trading
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Made Simple & Secure
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
              Advanced trading tools, real-time analytics, and institutional-grade security. 
              <br className="hidden md:block" />
              Join thousands of traders who trust Yield Guard for their daily trading operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {!signedAccountId ? (
                <Button 
                  size="lg" 
                  onClick={handleLogin}
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                >
                  <LogIn className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Connect Wallet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleWhitelistClick}
                  disabled={isPending}
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  {isPending ? "Processing..." : "WhiteList My Account"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-6 text-xl border-2 border-border/50 hover:border-primary/50 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300"
              onClick={() => navigate({ to: "/markets" })}
              >
                <Globe className="mr-2 h-5 w-5" />
                Explore Markets
              </Button>
            </div>
            
            {signedAccountId && (
              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20 backdrop-blur-sm max-w-md mx-auto">
                <p className="text-primary flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Connected: {signedAccountId}</span>
                </p>
              </div>
            )}

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Insured Funds</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <span>24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-card/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-card/20 via-card/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Why Choose Yield Guard</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to Trade
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built by traders, for traders. Experience the future of digital asset trading with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">Advanced Analytics</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Real-time market data, technical indicators, and AI-powered insights to make informed trading decisions with confidence.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">Lightning Fast Execution</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Sub-millisecond order execution with institutional-grade infrastructure and zero slippage guarantee for optimal trades.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">Bank-Grade Security</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Multi-layer security protocols, cold storage, and insurance coverage for maximum asset protection and peace of mind.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">Smart Trading Tools</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Automated strategies, risk management, and portfolio optimization tools designed for professional traders.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">Competitive Fees</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Industry-leading low fees with volume discounts and zero hidden costs. Keep more profit in your portfolio.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-semibold text-foreground mb-4">24/7 Monitoring</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Continuous market monitoring, instant alerts, and round-the-clock customer support for uninterrupted trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by Professionals</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Traders Say
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied traders who have transformed their trading experience with Yield Guard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <span className="font-semibold text-primary">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • 
                      <a 
                        href={`https://twitter.com/${testimonial.company.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors ml-1"
                      >
                        {testimonial.company}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Common Questions</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-xl text-muted-foreground">
              Get answers to the most common questions about our platform.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4 cursor-pointer">
                  <h4 className="text-lg font-semibold text-foreground">{faq.question}</h4>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Beta Access</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Ready to Start Trading?
          </h3>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive whitelist and be among the first to experience the future of professional trading.
          </p>
          
          {!signedAccountId ? (
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-8 text-2xl font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-2 border border-primary/20 mb-12"
            >
              <LogIn className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Connect Wallet to Get Started
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              onClick={handleWhitelistClick}
              disabled={isPending}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-8 text-2xl font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-2 border border-primary/20 mb-12"
            >
              <Sparkles className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              {isPending ? "Processing..." : "WhiteList My Account Now"}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Insured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Yield Guard
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Professional trading platform built for the next generation of digital asset traders. 
                Secure, fast, and reliable.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/markets" className="text-muted-foreground hover:text-primary transition-colors">Markets</a></li>
                <li><a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Trading Tools</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">System Status</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              </ul>
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@yieldguard.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>24/7 Live Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2024 Yield Guard. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Donation Dialog */}
      <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Join the Whitelist</span>
            </DialogTitle>
            <DialogDescription>
              You're about to join our exclusive whitelist! You can optionally support the platform with a donation in NEAR tokens.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="donation" className="text-sm font-medium">
                Donation Amount (NEAR) - Optional
              </label>
              <Input
                id="donation"
                type="number"
                placeholder="0.0"
                step="0.1"
                min="0"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="text-center"
              />
              <p className="text-xs text-muted-foreground text-center">
                Leave empty or enter 0 for no donation
              </p>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Account to Whitelist:</span>
              </div>
              <p className="text-sm text-muted-foreground break-all">{signedAccountId}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDonationDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDonationSubmit}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Submit Request</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
