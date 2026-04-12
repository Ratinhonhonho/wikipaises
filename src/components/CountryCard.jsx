import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

function CountryCard({ code, flag, name, capital, region, population }) {
  return (
    <Link to={`/country/${code}`} className={styles.cardLink}>
      <article className={styles.card}>
        <img
          src={flag}
          alt={`Bandeira de ${name}`}
          className={styles.flag}
        />

        <div className={styles.cardContent}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.info}>Capital: {capital}</p>
          <p className={styles.info}>População: {population}</p>
        </div>

        <span className={styles.regionBadge}>{region}</span>
      </article>
    </Link>
  );
}

export default CountryCard;