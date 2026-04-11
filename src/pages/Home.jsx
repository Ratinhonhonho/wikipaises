import Header from '../components/Header';
import CountryCard from '../components/CountryCard';

function Home() {
  return (
    <div>
      <Header />

      <main>
        <section>
          <h2>Lista de Países</h2>
          <p>Busca, filtro e paginação virão aqui.</p>
        </section>

        <section>
          <CountryCard />
          <CountryCard />
          <CountryCard />
        </section>
      </main>
    </div>
  );
}

export default Home;