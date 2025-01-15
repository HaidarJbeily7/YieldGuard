import { MaxWidthWrapper } from "../../utils/MaxWidthWrapper";
import { Tower } from "./Tower";
import { MiniCard1 } from "./MiniCard1";
import { MiniCard2 } from "./MiniCard2";
import { LongCard } from "./LongCard";
import { SimpleGrid } from "./SimpleGrid";
import { SectionHeading } from "../../utils/SectionHeading";
import { SectionSubheading } from "../../utils/SectionSubheading";
import { SectionHeadingSpacing } from "../../utils/SectionHeadingSpacing";

export const Content = () => {
  return (
    <section>
      <MaxWidthWrapper className="relative z-20 pb-20 pt-20 md:pb-28 md:pt-40">
        <SectionHeadingSpacing>
          <SectionHeading>
            Why{" "}
            <span className="bg-gradient-to-br from-[#41d7cb] to-[#2c9690] bg-clip-text text-transparent">
              YieldGuard AI
            </span>
            <br />
            is Your DeFi Protector
          </SectionHeading>
          <SectionSubheading>
            YieldGuard combines intelligent yield optimization and wallet
            security, ensuring safe and profitable DeFi investments on NEAR
            Protocol.
          </SectionSubheading>
        </SectionHeadingSpacing>

        <Grid />
        <div className="my-12 h-[1px] w-full bg-gradient-to-r from-main-dark30/0 via-main-light30/50 to-blue-800/0 md:my-20" />
        <SimpleGrid />
      </MaxWidthWrapper>
    </section>
  );
};

const Grid = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
    <Tower />
    <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-2">
      <MiniCard1 />
      <MiniCard2 />
      <LongCard />
    </div>
  </div>
);
