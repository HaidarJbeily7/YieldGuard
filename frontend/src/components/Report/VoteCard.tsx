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
    <div className="relative w-1/2 bg-[#121215] border border-white shadow-xl text-white rounded-lg p-8 text-center z-30">
      {/* Close Button (Top-Right) */}
      <div className="absolute top-4 right-4">
        <CloseReportButton />
      </div>

      {/* Report Title */}
      <h2 className="text-2xl font-bold mb-4">
        Community Voting on Report #{reportId}
      </h2>

      {/* Reported Account */}
      <p className="text-lg text-gray-400">
        Reported Account:{" "}
        <span className="font-semibold text-white">{account}</span>
      </p>

      {/* Voting Section */}
      <BarPoll />

      {/* Report Details */}
      <div className="flex justify-between mt-6 text-gray-300">
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
  );
};

export default VoteCard;
