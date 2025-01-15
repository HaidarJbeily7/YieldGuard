import { Card } from "../../utils/Card";
import { SiX } from "react-icons/si";
import { CornerBlur } from "../../utils/CornerBlur";

export const MiniCard2 = () => {
  return (
    <div className="col-span-2 h-[415px] sm:h-[375px] md:col-span-1">
      <Card>
        <p className="mb-1.5 text-2xl">What we want you to Say</p>
        <p className="text-zinc-400">
          We earn our users trust in YieldGuard AI by protecting their assets
          and maximizing returns. Here's what you will be saying soon:
        </p>

        <div className="absolute -bottom-2 left-2 right-2 z-10 h-44 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
          <div className="mb-3 flex gap-3">
            <img
              src="https://pbs.twimg.com/profile_images/1785089965619118080/NATKmh45_400x400.jpg"
              alt="Placeholder image for faux user Don Donaldson"
              className="size-10 shrink-0 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-50">Elon Musk</p>
              <p className="text-xs text-zinc-400">@elonmusk</p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-blue-300">@YieldGuard</span> is
            a game-changer. It saved me from a scam contract and helped me earn
            3x more through optimized strategies ❤️
          </p>

          <SiX className="absolute right-4 top-4 text-main" />
        </div>

        <CornerBlur />
      </Card>
    </div>
  );
};
