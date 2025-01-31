import styles from "./ReportInput.module.css";

export function ReportInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className={styles.brutalistContainer}>
      <input
        placeholder={placeholder}
        className={`${styles.brutalistInput} ${styles.smoothType}`}
        type="text"
        value={value}
        onChange={onChange}
      />
      <label className={styles.brutalistLabel}>{label}</label>
    </div>
  );
}
