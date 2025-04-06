import { Search } from "lucide-react";

import { Button, Tabs, TabsList } from "@mantine/core";
import { PerformanceChart } from "./PerformanceChart/PerformanceChart";
import { chartdata } from "./PerformanceChart/PerformanceChartData";

import { TabsContent, TabsTrigger } from "./ui/tabs";
import { PositionsTable } from "./PositionsTable/PositionsTable";
import { positions } from "./PositionsTable/PositionsTableData";
import { ActivityTable } from "./ActivityTable/ActivityTable";
import { activities } from "./ActivityTable/ActivityTableData";

export default function CheckActivities() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-teal-400">Spot</h1>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-teal-400">
                Wallets
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400">
                Perpetuals
              </a>
            </nav>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for other wallets..."
              className="w-full rounded-full bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-800 text-white hover:border-teal-500 hover:text-teal-400"
            >
              Second
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Button>
            <div className="flex items-center rounded bg-gray-900 px-3 py-1">
              <div className="mr-2 h-3 w-3 rounded-full bg-teal-500"></div>
              <span>1.447</span>
            </div>
            <div className="flex items-center rounded bg-gray-900 px-3 py-1">
              <span>13</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-teal-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-teal-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-teal-900 bg-opacity-30 text-teal-400"
            >
              1d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-teal-400"
            >
              7d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-teal-400"
            >
              30d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-teal-400"
            >
              Max
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Balance Section */}
          <div className="rounded-lg border border-gray-900 bg-gray-950 p-4">
            <h2 className="mb-4 text-lg font-medium text-teal-400">Balance</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-2xl font-bold">$444.65</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Unrealized PNL</p>
                <p className="text-xl font-medium text-red-500">-$376</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Available Balance</p>
                <p className="text-xl font-medium">$216.17</p>
              </div>
            </div>
          </div>

          {/* Realized PNL Chart */}
          <div className="rounded-lg border border-gray-900 bg-gray-950 p-4">
            <h2 className="mb-4 text-lg font-medium text-teal-400">
              Realized PNL
            </h2>
            <div className="h-[180px]">
              <PerformanceChart data={chartdata} />
            </div>
          </div>

          {/* Performance Section */}
          <div className="rounded-lg border border-gray-900 bg-gray-950 p-4">
            <h2 className="mb-4 text-lg font-medium text-teal-400">
              Performance
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">1d PNL</span>
                </div>
                <span className="text-red-500">-$760.74</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">1d TXNS</span>
                </div>
                <span>
                  260 <span className="text-teal-400">137</span>/
                  <span className="text-red-500">123</span>
                </span>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm text-gray-400">&gt;500%</span>
                  </div>
                  <span>2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-teal-400"></div>
                    <span className="text-sm text-gray-400">200% - 500%</span>
                  </div>
                  <span>1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-teal-300"></div>
                    <span className="text-sm text-gray-400">0% - 200%</span>
                  </div>
                  <span>50</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-red-400"></div>
                    <span className="text-sm text-gray-400">0% - -50%</span>
                  </div>
                  <span>54</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-400">&lt;-50%</span>
                  </div>
                  <span>7</span>
                </div>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-gray-900">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-red-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Positions and Activity Tabs */}
        <div className="mt-6 rounded-lg border border-gray-900 bg-gray-950">
          <Tabs defaultValue="positions">
            <div className="border-b border-gray-900 px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="positions"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-teal-400 data-[state=active]:bg-transparent data-[state=active]:text-teal-400"
                >
                  Active Positions
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-teal-400 data-[state=active]:bg-transparent data-[state=active]:text-teal-400"
                >
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="top"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-teal-400 data-[state=active]:bg-transparent data-[state=active]:text-teal-400"
                >
                  Top 100
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center space-x-4 py-2">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="9" x2="15" y1="15" y2="15"></line>
                  </svg>
                  <span>Show Hidden</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" x2="9.01" y1="9" y2="9"></line>
                    <line x1="15" x2="15.01" y1="9" y2="9"></line>
                  </svg>
                  <span>USD</span>
                </div>
              </div>
            </div>

            <TabsContent value="positions" className="p-0">
              <PositionsTable positions={positions} />
            </TabsContent>
            <TabsContent value="history" className="p-0">
              <div className="p-4 text-center text-gray-400">
                History will be displayed here
              </div>
            </TabsContent>
            <TabsContent value="top" className="p-0">
              <div className="p-4 text-center text-gray-400">
                Top 100 will be displayed here
              </div>
            </TabsContent>
          </Tabs>
          <div className="border-t border-gray-900">
            <Tabs defaultValue="activity">
              <div className="border-b border-gray-900 px-4">
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="activity"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-teal-400 data-[state=active]:bg-transparent data-[state=active]:text-teal-400"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="activity" className="p-0">
                <ActivityTable activities={activities} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
