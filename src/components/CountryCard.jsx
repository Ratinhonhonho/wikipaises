import { Link } from 'react-router-dom';

function CountryCard({ code, flag, name, capital, region, population }) {
  return (
    <Link to={`/country/${code}`}>
      <div>
        <img src={flag} alt={`Bandeira de ${name}`} width="160" />
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Região: {region}</p>
        <p>População: {population}</p>
      </div>
    </Link>
  );
}

export default CountryCard;