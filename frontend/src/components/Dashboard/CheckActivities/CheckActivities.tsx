import { Search } from "lucide-react";

import { Button } from "@mantine/core";

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
    </div>
  );
}
