import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import api from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Guarda o que o usúario digitou na parte da busca

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

  const filteredCountries = countries.filter((country) =>
  country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase()) //vAI percorrer a lista e verificar se o que foi digitado contém em países, também vai evitar problemas com letras minusculas e maiusculas.
);

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
    onChange={(event) => setSearchTerm(event.target.value)} // Atualiza o state a cada digitação e conecta o input ao state
  />
</section>

        {loading ? (
          <p>Carregando países...</p>
        ) : (
          <section>
  {filteredCountries.slice(0, 6).map((country) => (
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