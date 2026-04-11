import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import api from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading,setLoading] = useState(true);
  const [searchTerm,setSearchTerm] = useState(''); // Guarda o que o usúario digitou na parte da busca
  const [selectedRegion, setSelectedRegion] = useState(''); // GUarda o continente escolhido

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await api.get(
          '/all?fields=name,capital,region,population,flags,cca3'
        );
        setCountries(response.data);
      } catch (error) {
        console.error('Erro ao buscar países:', error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
  const matchesName = country.name?.common // Verifica se o nome da match
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesRegion = selectedRegion // Verifica se o continenete da match
    ? country.region === selectedRegion
    : true;

  return matchesName && matchesRegion; // Aplicação dos dois filtros juntos 
});

  return (
    <div>
      <Header />

      <main>
        <section>
  <h2>Lista de Países</h2>

  <input
    type="text"
    placeholder="Buscar país pelo nome"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select // Seleciona or continenete 
    value={selectedRegion}
    onChange={(event) => setSelectedRegion(event.target.value)} // COnectam os campos ao State
  >
    <option value="">Todos os continentes</option>
    <option value="Americas">Americas</option>
    <option value="Europe">Europe</option>
    <option value="Asia">Asia</option>
    <option value="Africa">Africa</option>
    <option value="Oceania">Oceania</option>
  </select>
</section>

        {loading ? (
          <p>Carregando países...</p>
        ) : (
          <section>
  {filteredCountries.slice(0, 10).map((country) => (
    <CountryCard
      key={country.cca3}
      code={country.cca3}
      flag={country.flags?.png}
      name={country.name?.common}
      capital={country.capital?.[0] || 'Sem capital'}
      region={country.region}
      population={country.population?.toLocaleString('pt-BR')}
    />
  ))}
</section>
        )}
      </main>
    </div>
  );
}

export default Home;