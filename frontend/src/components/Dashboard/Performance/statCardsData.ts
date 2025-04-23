export interface StatCardData {
    title: string;
    value: string;
    pillText: string;
    trend: "up" | "down";
    period: string;
  }
  
  export const statCardsData: StatCardData[] = [
    {
      title: "Gross Revenue",
      value: "$120,054.24",
      pillText: "2.75%",
      trend: "up",
      period: "From Jan 1st - Jul 31st",
    },
    {
      title: "Avg Order",
      value: "$27.97",
      pillText: "1.01%",
      trend: "down",
      period: "From Jan 1st - Jul 31st",
    },
    {
      title: "Trailing Year",
      value: "$278,054.24",
      pillText: "60.75%",
      trend: "up",
      period: "Previous 365 days",
    },
  ];
  