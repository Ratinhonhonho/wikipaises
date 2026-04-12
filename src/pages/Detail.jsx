import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoBlock from '../components/InfoBlock';
import api from '../services/api';
import styles from './Detail.module.css';

function Detail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const currencyCode = country?.currencies ? Object.keys(country.currencies)[0] : null;
  const currencyData = currencyCode ? country.currencies[currencyCode] : null;

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await api.get(`/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Erro ao buscar detalhes do país:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [code]);

  if (loading) {
    return <p className={styles.message}>Carregando detalhes...</p>;
  }

  if (!country) {
    return <p className={styles.message}>País não encontrado.</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          Voltar para a lista
        </Link>

        <section className={styles.hero}>
          <img
            src={country.flags?.png}
            alt={`Bandeira de ${country.name?.common}`}
            className={styles.flag}
          />

          <div>
            <h1 className={styles.title}>{country.name?.common}</h1>
            <p className={styles.subtitle}>{country.name?.official}</p>
          </div>
        </section>

        <section className={styles.infoGrid}>
          <InfoBlock title="Capital" value={country.capital?.[0] || 'Sem capital'} />
          <InfoBlock title="Continente" value={country.region || 'Não informado'} />
          <InfoBlock title="Sub-região" value={country.subregion || 'Não informada'} />
          <InfoBlock
            title="Área"
            value={country.area ? `${country.area.toLocaleString('pt-BR')} km²` : 'Não informado'}
          />
          <InfoBlock
            title="População"
            value={country.population?.toLocaleString('pt-BR') || 'Não informado'}
          />
          <InfoBlock
            title="Idiomas"
            value={
              country.languages
                ? Object.values(country.languages).join(', ')
                : 'Não informado'
            }
          />
          <InfoBlock
            title="Moeda"
            value={
              currencyData
                ? `${currencyData.name} (${currencyCode}) ${currencyData.symbol || ''}`
                : 'Não informado'
            }
          />
          <InfoBlock title="Código" value={country.cca3 || 'Não informado'} />
        </section>

        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>Sobre o país</h2>
          <p className={styles.aboutText}>
            {country.name?.common} é um país com identidade própria, marcado por
            aspectos culturais, históricos, geográficos e sociais que o tornam
            relevante no cenário internacional.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Detail;