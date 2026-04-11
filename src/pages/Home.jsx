import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import api from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <Header />

      <main>
        <section>
          <h2>Lista de Países</h2>
          <p>Busca, filtro e paginação virão aqui.</p>
        </section>

        {loading ? (
          <p>Carregando países...</p>
        ) : (
          <section>
  {countries.slice(0, 6).map((country) => (
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