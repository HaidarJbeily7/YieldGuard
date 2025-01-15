import {
  FiCalendar,
  FiCheck,
  FiCloud,
  FiDollarSign,
  FiMoon,
  FiWatch,
} from "react-icons/fi";
import { IconType } from "react-icons";

export const SimpleGrid = () => (
  <div className="relative z-10 grid grid-cols-2 gap-9 px-3 md:grid-cols-3 md:gap-12 md:px-6">
    <Item
      Icon={FiCalendar}
      title="Focus on Profitable Opportunities"
      subtitle="Let YieldGuard AI handle the heavy lifting of tracking APYs, analyzing risks, and providing yield recommendations, so you can focus on making the best investment decisions."
    />
    <Item
      Icon={FiWatch}
      title="Automate Your Strategy"
      subtitle="Say goodbye to manual monitoring and analysis—YieldGuard AI provides real-time insights and automated recommendations to save you time."
    />
    <Item
      Icon={FiMoon}
      title="Secure Your Investments"
      subtitle="Sleep soundly knowing that YieldGuard AI’s scam detection, wallet analysis, and community-driven trust system protect your assets from malicious contracts and bad actors."
    />
    <Item
      Icon={FiDollarSign}
      title="Maximize Your Returns"
      subtitle="Leverage AI-driven yield strategies and auto-compounding suggestions to make every dollar in your DeFi portfolio work harder."
    />
    <Item
      Icon={FiCloud}
      title="Seamless Protocol Integration"
      subtitle="Effortlessly connect to NEAR’s top DeFi platforms, like Ref Finance and Jumbo, for an all-in-one yield optimization and security experience."
    />
    <Item
      Icon={FiCheck}
      title="All-in-One Platform"
      subtitle="From yield tracking to wallet scoring and risk assessment, YieldGuard AI provides a comprehensive suite of tools for safe and profitable DeFi investments."
    />
  </div>
);

const Item = ({
  Icon,
  title,
  subtitle,
}: {
  Icon: IconType;
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h4 className="mb-1.5 flex items-start text-lg font-medium md:text-xl">
        <Icon className="mr-1.5 h-[26px] text-main" />
        {title}
      </h4>
      <p className="text-sm text-zinc-400 md:text-base">{subtitle}</p>
    </div>
  );
};
