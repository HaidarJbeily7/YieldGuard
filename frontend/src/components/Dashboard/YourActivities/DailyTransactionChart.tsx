import { LineChart } from "@mantine/charts";
import { Title, Text, Paper} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';

type DailyTransaction = {
  date: string;
  count: number;
};

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  label: string;
  payload: TooltipPayload[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md" bg="#121215">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export function DailyTransactionChart({
  dailyTxCounts,
}: {
  dailyTxCounts: DailyTransaction[];
}) {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  if (!dailyTxCounts.length)
    return <Text>No data available for the chart.</Text>;

  return (
    <>
      <Title mx="2rem" order={2} size={isSmallScreen ? "h4" : "h2"}>
        Transactions Activitys
      </Title>
      <Paper m="2rem" px="1rem" py="3rem" bg="#121215" withBorder radius="lg">
        <LineChart
          h={isSmallScreen ? 200 : 300}
          data={dailyTxCounts.map((tx) => ({
            date: new Date(tx.date).toLocaleDateString(),
            Transactions: tx.count,
          }))}
          dataKey="date"
          tooltipProps={{
            content: ({ label, payload }) => (
              <ChartTooltip
                label={label}
                payload={payload as TooltipPayload[]}
              />
            ),
          }}
          series={[{ name: "Transactions", color: "#3bc8bd" }]}
          curveType="bump"
          connectNulls
          activeDotProps={{ r: 8, strokeWidth: 1, fill: "#fff" }}
          dotProps={{ r: 2, strokeWidth: 0.5, stroke: "#fff" }}
        />
      </Paper>
    </>
  );
}
