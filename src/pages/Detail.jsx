import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Landmark,
  Globe,
  MapPinned,
  Ruler,
  Users,
  Languages,
  Banknote,
  BadgeInfo,
  ArrowLeft,
} from 'lucide-react';
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
          <ArrowLeft size={18} />
          <span>Voltar para a lista</span>
        </Link>

        <section className={styles.hero}>
          <div className={styles.flagWrapper}>
            <img
              src={country.flags?.svg || country.flags?.png}
              alt={`Bandeira de ${country.name?.common}`}
              className={styles.flag}
            />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.codeBadge}>{country.cca3}</span>
            <h1 className={styles.title}>{country.name?.common}</h1>
            <p className={styles.subtitle}>{country.name?.official}</p>

            <p className={styles.description}>
              Conheça informações relevantes sobre {country.name?.common}, incluindo
              localização, população, idiomas, moeda e outros dados gerais.
            </p>
          </div>
        </section>

        <section className={styles.infoGrid}>
          <InfoBlock
            title={
              <>
                <Landmark size={16} /> Capital
              </>
            }
            value={country.capital?.[0] || 'Sem capital'}
          />

          <InfoBlock
            title={
              <>
                <Globe size={16} /> Continente
              </>
            }
            value={country.region || 'Não informado'}
          />

          <InfoBlock
            title={
              <>
                <MapPinned size={16} /> Sub-região
              </>
            }
            value={country.subregion || 'Não informada'}
          />

          <InfoBlock
            title={
              <>
                <Ruler size={16} /> Área
              </>
            }
            value={country.area ? `${country.area.toLocaleString('pt-BR')} km²` : 'Não informado'}
          />

          <InfoBlock
            title={
              <>
                <Users size={16} /> População
              </>
            }
            value={country.population?.toLocaleString('pt-BR') || 'Não informado'}
          />

          <InfoBlock
            title={
              <>
                <Languages size={16} /> Idiomas
              </>
            }
            value={
              country.languages
                ? Object.values(country.languages).join(', ')
                : 'Não informado'
            }
          />

          <InfoBlock
            title={
              <>
                <Banknote size={16} /> Moeda
              </>
            }
            value={
              currencyData
                ? `${currencyData.name} (${currencyCode}) ${currencyData.symbol || ''}`
                : 'Não informado'
            }
          />

          <InfoBlock
            title={
              <>
                <BadgeInfo size={16} /> Código
              </>
            }
            value={country.cca3 || 'Não informado'}
          />
        </section>

        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>Sobre o país</h2>
          <p className={styles.aboutText}>
            {country.name?.common} é um país com identidade cultural, histórica e
            geográfica própria. Através desta página, é possível visualizar dados
            gerais que ajudam a compreender melhor sua localização, idioma, moeda,
            dimensão territorial e relevância no cenário internacional.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Detail;