import styles from "./NotFoundBG.module.css";

const NotFoundBG = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 21 }).map((_, i) => (
        <div
          key={i}
          className={styles.item}
          style={{ "--i": i } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default NotFoundBG;
