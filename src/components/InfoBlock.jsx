import styles from './InfoBlock.module.css';

function InfoBlock({ title, value }) {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default InfoBlock;