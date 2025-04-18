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
      title="Emotional Behavior Alerts"
      subtitle="Receive notifications when you're about to make impulsive trades, helping you
stay disciplined."
    />
    <Item
      Icon={FiWatch}
      title="Regret Index"
      subtitle="Analyze missed opportunities and understand the reasons behind them to
improve future decisions."
    />
    <Item
      Icon={FiMoon}
      title="Smart Alerts"
      subtitle="Get real-time insights when significant market movements occur, such as large
trades by influential wallets."
    />
    <Item
      Icon={FiDollarSign}
      title="Risk Profiling & Strategy Analysis"
      subtitle="Assess your risk tolerance and receive tailored advice to optimize your trading
strategies."
    />
    <Item
      Icon={FiCloud}
      title="AI Chat Assistant"
      subtitle="Discuss your trading ideas with an AI that provides data-driven feedback and
suggestions."
    />
    <Item
      Icon={FiCheck}
      title="All-in-One Platform"
      subtitle="YieldGuard AI offers tools for yield tracking, wallet scoring, and risk assessment—empowering safer, more profitable DeFi investing."
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
