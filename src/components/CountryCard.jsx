function CountryCard({ flag, name, capital, region, population }) {
  return (
    <div>
      <img src={flag} alt={`Bandeira de ${name}`} width="160" />
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Região: {region}</p>
      <p>População: {population}</p>
    </div>
  );
}

export default CountryCard;