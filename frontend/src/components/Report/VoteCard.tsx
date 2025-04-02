import CloseReportButton from "./CloseReportButton";
import BarPoll from "./Poll";

interface VoteCardProps {
  reportId: string;
  account: string;
  yesVotes: number;
  noVotes: number;
  deadline: string;
  staked: number;
}

const VoteCard = ({
  reportId,
  account,
  yesVotes,
  noVotes,
  deadline,
  staked,
}: VoteCardProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl bg-[#121215] border border-white shadow-xl text-white rounded-lg p-6 md:p-8 text-center overflow-y-auto max-h-[90vh]">
        <div className="absolute top-2 right-2 md:top-4 md:right-4">
          <CloseReportButton />
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 mt-6">
          Community Voting on Report #{reportId}
        </h2>

        <p className="text-base md:text-lg text-gray-400 ">
          Reported Account:{" "}
          <span className="font-semibold text-white break-all">{account}</span>
        </p>

        <div>
          <BarPoll />
        </div>

        <div className="hidden">
          Those Votes should be passed to BarPill {yesVotes} {noVotes}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm md:text-base text-gray-300">
          <p>
            Deadline:{" "}
            <span className="font-semibold text-white">
              {new Date(deadline).toLocaleDateString()}
            </span>
          </p>
          <p>
            Staked:{" "}
            <span className="font-semibold text-white">{staked} NEAR</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;