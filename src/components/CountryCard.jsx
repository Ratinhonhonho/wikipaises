import { Link } from 'react-router-dom';
import { Landmark, Users } from 'lucide-react';
import styles from './CountryCard.module.css';

function CountryCard({ code, flag, name, capital, region, population }) {
  function getRegionClass(regionName) {
    switch (regionName) {
      case 'Americas':
        return styles.americas;
      case 'Europe':
        return styles.europe;
      case 'Asia':
        return styles.asia;
      case 'Africa':
        return styles.africa;
      case 'Oceania':
        return styles.oceania;
      default:
        return styles.defaultRegion;
    }
  }

  return (
    <Link to={`/country/${code}`} className={styles.cardLink}>
      <article className={styles.card}>
        <img
  src={flag}
  alt={`Bandeira de ${name}`}
  className={styles.flag}
  onError={(event) => {
    event.currentTarget.src = 'https://via.placeholder.com/320x200?text=Sem+bandeira';
  }}
/>

        <div className={styles.cardContent}>
          <h2 className={styles.name}>{name}</h2>
<p className={styles.info}>
  <Landmark size={16} />
  <span>{capital}</span>
</p>

<p className={styles.info}>
  <Users size={16} />
  <span>{population}</span>
</p>
        </div>

        <span className={`${styles.regionBadge} ${getRegionClass(region)}`}>
          {region}
        </span>
      </article>
    </Link>
  );
}

export default CountryCard;