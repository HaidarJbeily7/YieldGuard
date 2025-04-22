import { IconHistory } from "@tabler/icons-react";
import { useState } from "react";

export function RegretIndexCard() {
  const [enabled, setEnabled] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#111] border border-main/40 rounded-2xl p-6 shadow-lg animate-fade-in hover:shadow-[0_0_20px_#3bc8bd] hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-main/20 rounded-full transition-colors group-hover:bg-main/30">
          <IconHistory className="text-main" size={28} />
        </div>
        <h3 className="text-xl font-semibold text-main group-hover:underline">
          Regret Index
        </h3>
      </div>

      <p className="text-sm text-gray-300 mb-5 leading-relaxed">
        Learn from your past trades. The Regret Index helps identify missed
        opportunities and decision patterns, empowering you to improve your
        future strategies.
      </p>

      <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4 border border-gray-700">
        <p className="text-gray-400 text-sm mb-3 font-semibold">
          ❗ Missed Opportunity Examples:
        </p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Didn't buy before a price surge
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Held onto a losing trade too long
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Reacted too late to market signals
          </li>
        </ul>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-main text-sm hover:underline mb-3 transition-all"
      >
        {showDetails ? "Hide Index Logic" : "How Regret Index Works →"}
      </button>

      {showDetails && (
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-4 transition-all duration-300 animate-fade-in">
          <p className="text-gray-400 text-sm mb-2 font-semibold">📊 Index Logic:</p>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Evaluates missed profits and losses from historical trades</li>
            <li>Scores behavior using risk tolerance & decision delays</li>
            <li>Highlights patterns to help avoid repeat mistakes</li>
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-400 text-sm">
          {enabled ? "Regret Index On" : "Regret Index Off"}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={() => setEnabled((prev) => !prev)}
          />
          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-main transition-colors" />
          <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-5 transition-transform" />
        </label>
      </div>

      <div className="mt-5 text-right">
        <a
          href="#"
          className="text-main text-sm font-medium hover:underline hover:text-teal-300 transition-colors"
        >
          Learn more →
        </a>
      </div>
    </div>
  );
}
