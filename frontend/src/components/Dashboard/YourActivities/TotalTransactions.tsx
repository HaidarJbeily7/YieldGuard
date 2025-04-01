import { Paper, Text } from "@mantine/core";
import styles from "./TotalTransactions.module.css";

export function TotalTransactions({ totalTx }: { totalTx: number }) {
  return (
    <Paper my="2rem" mx="2rem"  withBorder  radius="md">
      <div className={styles.outer}>
        <div  className={styles.dot}></div>
        <div  className={styles.card}>
          <div className={styles.text}>{totalTx}</div>
          <Text fw={500}>Transactions</Text>
          <div className={`${styles.line} ${styles.topl}`}></div>
          <div className={`${styles.line} ${styles.leftl}`}></div>
          <div className={`${styles.line} ${styles.bottoml}`}></div>
          <div className={`${styles.line} ${styles.rightl}`}></div>
        </div>
      </div>
    </Paper>
  );
}