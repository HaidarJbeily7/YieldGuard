import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";

export function EmotionalBehaviorAlertsCard() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="bg-[#111] border border-main/40 rounded-2xl p-6 shadow-lg animate-fade-in hover:shadow-[0_0_20px_#3bc8bd] hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-main/20 rounded-full transition-colors group-hover:bg-main/30">
          <IconAlertTriangle className="text-main" size={28} />
        </div>
        <h3 className="text-xl font-semibold text-main group-hover:underline">
          Emotional Behavior Alerts
        </h3>
      </div>

      <p className="text-sm text-gray-300 mb-5 leading-relaxed">
        Stay ahead of your emotions. Get real-time alerts when your actions
        suggest panic selling, FOMO buying, or impulsive behavior.
      </p>

      <div className="bg-[#1a1a1a] p-4 rounded-lg mb-5 border border-gray-700">
        <p className="text-gray-400 text-sm mb-3 font-semibold">
          🧠 Smart Alert Triggers:
        </p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Sudden sell after market drop
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Rapid buy after major price spike
          </li>
          <li className="hover:text-main transition-colors duration-200 cursor-help">
            Repeated trading within minutes
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">
          {enabled ? "Alerts Enabled" : "Alerts Disabled"}
        </span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={() => setEnabled((prev) => !prev)}
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-main transition-colors" />
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
