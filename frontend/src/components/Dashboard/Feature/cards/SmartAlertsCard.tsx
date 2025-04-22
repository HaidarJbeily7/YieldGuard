import { IconBellRinging } from "@tabler/icons-react";
import { useState } from "react";

export function SmartAlertsCard() {
  const [enabled, setEnabled] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#111] border border-main/40 rounded-2xl p-6 shadow-lg animate-fade-in hover:shadow-[0_0_20px_#3bc8bd] hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-main/20 rounded-full transition-colors group-hover:bg-main/30">
          <IconBellRinging className="text-main" size={28} />
        </div>
        <h3 className="text-xl font-semibold text-main group-hover:underline">
          Smart Alerts
        </h3>
      </div>

      <p className="text-sm text-gray-300 mb-5 leading-relaxed">
        Stay ahead with AI-powered alerts tailored to your behavior and market
        activity. Never miss a critical opportunity or warning again.
      </p>

      <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4 border border-gray-700">
        <p className="text-gray-400 text-sm mb-3 font-semibold">
          🔔 Alert Types:
        </p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Emotion-triggered alerts (e.g. FOMO/FUD)
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Pattern-based signals from your trading history
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Adaptive stop-loss/profit reminders
          </li>
        </ul>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-main text-sm hover:underline mb-3 transition-all"
      >
        {showDetails ? "Hide Alert Logic" : "How Smart Alerts Work →"}
      </button>

      {showDetails && (
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-4 transition-all duration-300 animate-fade-in">
          <p className="text-gray-400 text-sm mb-2 font-semibold">🤖 Alert Engine:</p>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Analyzes user behavior and market trends in real-time</li>
            <li>Uses ML to detect emotional triggers and risky behavior</li>
            <li>Delivers personalized alerts to improve reaction time</li>
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-400 text-sm">
          {enabled ? "Smart Alerts On" : "Smart Alerts Off"}
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
