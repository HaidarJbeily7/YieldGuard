// components/cards/RiskProfilingCard.tsx
import { IconShieldCheck } from "@tabler/icons-react";
import { useState } from "react";

export function RiskProfilingCard() {
  const [profile, setProfile] = useState<"Low" | "Medium" | "High">("Medium");
  const [showTips, setShowTips] = useState(false);

  const profiles = {
    Low: "You prefer capital preservation. Alerts are conservative and focus on risk avoidance.",
    Medium:
      "You seek balanced growth. Alerts will weigh both risk and reward evenly.",
    High: "You're aggressive. Alerts highlight high-risk, high-reward opportunities.",
  };

  return (
    <div className="bg-[#111] border border-main/40 rounded-2xl p-6 shadow-lg animate-fade-in hover:shadow-[0_0_20px_#3bc8bd] hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-main/20 rounded-full transition-colors group-hover:bg-main/30">
          <IconShieldCheck className="text-main" size={28} />
        </div>
        <h3 className="text-xl font-semibold text-main group-hover:underline">
          Risk Profiling
        </h3>
      </div>

      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        Define your risk appetite to personalize trading signals and behavior
        insights. Alerts and strategies will align with your selected profile.
      </p>

      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-sm mb-3 font-semibold">🎯 Choose Profile:</p>
        <div className="flex gap-3">
          {(["Low", "Medium", "High"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setProfile(type)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                profile === type
                  ? "bg-main text-black shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-400 text-sm">
          <p className="italic">{profiles[profile]}</p>
        </div>
      </div>

      <button
        onClick={() => setShowTips(!showTips)}
        className="text-main text-sm hover:underline mt-5 transition-all"
      >
        {showTips ? "Hide Strategy Tips" : "See Strategy Tips →"}
      </button>

      {showTips && (
        <div className="mt-3 bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 transition-all duration-300 animate-fade-in">
          <p className="text-gray-400 text-sm font-semibold mb-2">📌 Tips:</p>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li>Adjust position sizing based on your profile.</li>
            <li>
              Set stop-loss and take-profit levels that align with risk
              tolerance.
            </li>
            <li>
              Combine alerts with emotion analysis for best decision-making.
            </li>
          </ul>
        </div>
      )}

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
