import { Divider } from "@mantine/core";

type AccountData = {
  account_id: string;
  timestamp_creation: string;
  sha_code: string;
  parent: string;
};

export function AccountOverview({ accountData }: { accountData: AccountData }) {
  return (
    <div className="m-8 p-6 bg-[#121215] text-white border border-gray-700 rounded-lg shadow-lg max-w-full w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px]">
      <h2 className="text-lg font-bold">Overview</h2>
      <Divider className="my-2" />
      
      <p className="text-sm">
        <b>Created On:</b>{" "}
        {new Date(Number(accountData.timestamp_creation) / 1e6).toLocaleString()}
      </p>
      <Divider className="my-2" />
      
      <p className="text-sm break-all p-2 rounded-md overflow-hidden">
        <b>SHA Code:</b> {accountData.sha_code}
      </p>
      <Divider className="my-2" />
      
      <p className="text-sm">
        <b>Parent Account:</b> {accountData.parent}
      </p>
    </div>
  );
}
