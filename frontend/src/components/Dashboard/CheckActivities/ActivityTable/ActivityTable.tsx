export function ActivityTable({ activities }: { activities: Activity[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-900 text-left text-sm text-gray-400">
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Token</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Explorer</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr
              key={index}
              className="border-b border-gray-900 text-sm hover:bg-gray-800"
            >
              <td className={`px-4 py-3 ${activity.typeColor}`}>
                {activity.type}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-2 h-8 w-8 rounded-full bg-gray-900 p-1">
                    {activity.token.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{activity.token}</div>
                    <div className="text-xs text-gray-400">
                      {activity.tokenFull}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-teal-500"></div>
                  <span>{activity.price}</span>
                </div>
              </td>
              <td className="px-4 py-3">{activity.amount}</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
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
                    className="mr-1 h-4 w-4 text-gray-400"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
              </td>
              <td className="px-4 py-3">{activity.time}</td>
              <td className="px-4 py-3">
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" x2="21" y1="14" y2="3"></line>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Define the Activity type (optional but recommended)
type Activity = {
  type: string;
  typeColor: string;
  token: string;
  tokenFull: string;
  price: string;
  amount: string;
  time: string;
};
