import { Flex, Text } from "@mantine/core";
import styles from "./ReportCard.module.css";

export function ReportCard({
  report,
  onNavigate,
}: {
  report: {
    id: string;
    account: string;
    yesVotes: number;
    noVotes: number;
    deadline: string;
    staked: number;
  };
  onNavigate: (id: string) => void;
}) {
  const totalVotes = report.yesVotes + report.noVotes;
  const yesPercentage =
    totalVotes > 0 ? (report.yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (report.noVotes / totalVotes) * 100 : 0;

  return (
    <div
      className={`${styles.container} noselect`}
      onClick={() => onNavigate(report.id)}
    >
      <div className={styles.canvas}>
        <div className={styles.tracker}></div>
        <div id={styles.card}>
          <div className={styles["card-content"]}>
            <div className={styles["card-glare"]}></div>
            <div className={styles["cyber-lines"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p id={styles.prompt}>{`Account: ${report.account}`}</p>
            <div className={styles.title}>
              <Flex
                direction="row"
                align="center"
                justify="space-around"
                gap="lg"
                p="1rem"
              >
                {/* Yes Votes */}
                <Flex direction="column" align="center">
                  <Text c="#00ffaa" w="bold" size="sm">
                    {report.yesVotes} Yes Votes
                  </Text>
                  <Text c="#00ffaa" size="xs" mb="xs">
                    ({yesPercentage.toFixed(1)}%)
                  </Text>
                  <div
                    style={{
                      width: "62%",

                      height: "120px",
                      backgroundColor: "#1a1a1a",
                      borderRadius: "8px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${yesPercentage}%`,
                        backgroundColor: "#00ffaa",
                        position: "absolute",
                        bottom: 0,
                        transition: "height 0.3s ease",
                      }}
                    ></div>
                  </div>
                </Flex>

                {/* No Votes */}
                <Flex direction="column" align="center">
                  <Text c="#e74c3c" w="bold" size="sm">
                    {report.noVotes} No Votes
                  </Text>
                  <Text c="#e74c3c" size="xs" mb="xs">
                    ({noPercentage.toFixed(1)}%)
                  </Text>
                  <div
                    style={{
                      width: "65%",
                      height: "120px",
                      backgroundColor: "#1a1a1a",
                      borderRadius: "8px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${noPercentage}%`,
                        backgroundColor: "#e74c3c",
                        position: "absolute",
                        bottom: 0,
                        transition: "height 0.3s ease",
                      }}
                    ></div>
                  </div>
                </Flex>
              </Flex>
            </div>
            <div className={styles["glowing-elements"]}>
              <div className={styles["glow-1"]}></div>
              <div className={styles["glow-2"]}></div>
              <div className={styles["glow-3"]}></div>
            </div>
            <div className={styles.subtitle}>
              <span>{`Deadline: ${new Date(
                report.deadline
              ).toLocaleDateString()}`}</span>
              <span
                className={styles.highlight}
              >{`Staked: ${report.staked} NEAR`}</span>
            </div>
            <div className={styles["card-particles"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles["corner-elements"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles["scan-line"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
