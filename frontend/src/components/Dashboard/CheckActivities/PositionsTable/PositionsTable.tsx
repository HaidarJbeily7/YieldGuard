export function PositionsTable({ positions }: { positions: Position[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-900 text-left text-sm text-gray-400">
            <th className="px-4 py-3">Token</th>
            <th className="px-4 py-3">Bought</th>
            <th className="px-4 py-3">Sold</th>
            <th className="px-4 py-3">Remaining</th>
            <th className="px-4 py-3">PNL</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, index) => (
            <tr
              key={index}
              className="border-b border-gray-900 text-sm hover:bg-gray-800"
            >
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-2 h-8 w-8 rounded-full bg-gray-900 p-1">
                    {position.token.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{position.token}</div>
                    <div className="text-xs text-gray-400">
                      {position.tokenFull}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div>{position.bought}</div>
                <div className="text-xs text-gray-400">
                  {position.boughtAmount}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>{position.sold}</div>
                <div className="text-xs text-gray-400">
                  {position.soldAmount}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>{position.remaining}</div>
                <div className="text-xs text-gray-400">
                  {position.remainingAmount}
                </div>
              </td>
              <td className={`px-4 py-3 ${position.pnlColor}`}>
                {position.pnl}
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  {/** Buttons */}
                  <button className="rounded bg-gray-900 p-1 text-gray-400 hover:text-teal-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="9" x2="15" y1="15" y2="15"></line>
                    </svg>
                  </button>
                  <button className="rounded bg-gray-900 p-1 text-gray-400 hover:text-teal-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                  <button className="rounded bg-gray-900 p-1 text-gray-400 hover:text-teal-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  </button>
                  <button className="rounded bg-gray-900 p-1 text-gray-400 hover:text-teal-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Define the Position type
type Position = {
  token: string;
  tokenFull: string;
  bought: string;
  boughtAmount: string;
  sold: string;
  soldAmount: string;
  remaining: string;
  remainingAmount: string;
  pnl: string;
  pnlColor: string;
};
