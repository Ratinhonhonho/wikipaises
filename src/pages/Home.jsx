import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import api from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const countriesPerPage = 12;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion]);

  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name?.common
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;

    return matchesName && matchesRegion;
  });

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

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

          <select
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
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
          <>
            <section>
              {paginatedCountries.map((country) => (
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

            <div>
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <span>
                Página {currentPage} de {totalPages || 1}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;