import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import api from '../services/api';
import styles from './Home.module.css';

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
      .startsWith(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;

    return matchesName && matchesRegion;
  });

  const sortedCountries = [...filteredCountries].sort((a, b) =>
    a.name?.common.localeCompare(b.name?.common)
  );

  const totalPages = Math.ceil(sortedCountries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const paginatedCountries = sortedCountries.slice(startIndex, endIndex);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.contentArea}>
          <section className={styles.topSection}>
            <h2 className={styles.title}>Lista de Países</h2>

            <div className={styles.controls}>
              <input
                className={styles.input}
                type="text"
                placeholder="Buscar país pelo nome"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <select
                className={styles.select}
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
            </div>
          </section>

          {loading ? (
            <p className={styles.message}>Carregando países...</p>
          ) : (
            <section className={styles.grid}>
              {paginatedCountries.length === 0 ? (
                <p className={styles.message}>Nenhum país encontrado.</p>
              ) : (
                paginatedCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    code={country.cca3}
                    flag={country.flags?.svg || country.flags?.png}
                    name={country.name?.common}
                    capital={country.capital?.[0] || 'Sem capital'}
                    region={country.region}
                    population={country.population?.toLocaleString('pt-BR')}
                  />
                ))
              )}
            </section>
          )}
        </div>

        {!loading && (
          <div className={styles.pagination}>
            <button
              className={styles.button}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            <span className={styles.pageIndicator}>
              Página {currentPage} de {totalPages || 1}
            </span>

            <button
              className={styles.button}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Próximo
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home; 