import styles from "./ReportButton.module.css";

export function ReportButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`self-end ${styles.ReportButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.ReportButtonSpan}> Report </span>
    </button>
  );
}
