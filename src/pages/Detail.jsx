import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoBlock from '../components/InfoBlock';
import api from '../services/api';

function Detail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <p>Carregando detalhes...</p>;
  }

  if (!country) {
    return <p>País não encontrado.</p>;
  }

  return (
    <div>
      <h1>Detalhes do País</h1>

      <section>
        <img
          src={country.flags?.png}
          alt={`Bandeira de ${country.name?.common}`}
          width="250"
        />
      </section>

      <section>
        <h2>{country.name?.common}</h2>
        <p>{country.name?.official}</p>
      </section>

      <section>
        <InfoBlock title="Capital" value={country.capital?.[0] || 'Sem capital'} />
        <InfoBlock title="Continente" value={country.region || 'Não informado'} />
        <InfoBlock title="Sub-região" value={country.subregion || 'Não informada'} />
        <InfoBlock title="Área" value={`${country.area?.toLocaleString('pt-BR')} km²`} />
        <InfoBlock
          title="População"
          value={country.population?.toLocaleString('pt-BR')}
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
          title="Código"
          value={country.cca3 || 'Não informado'}
        />
      </section>

      <section>
        <h3>Sobre o país</h3>
        <p>
          {country.name?.common} é um país muito interessante, com características
          culturais, geográficas e históricas próprias.
        </p>
      </section>

      <Link to="/">Voltar para a lista</Link>
    </div>
  );
}

export default Detail;