import InfoBlock from '../components/InfoBlock';

function Detail() {
  return (
    <div>
      <h1>Detalhes do País</h1>

      <section>
        <img
          src="https://flagcdn.com/w320/br.png"
          alt="Bandeira do país"
          width="250"
        />
      </section>

      <section>
        <h2>Brasil</h2>
        <p>República Federativa do Brasil</p>
      </section>

      <section>
        <InfoBlock title="Capital" value="Brasília" />
        <InfoBlock title="Continente" value="Américas" />
        <InfoBlock title="População" value="203.062.512" />
        <InfoBlock title="Código" value="BRA" />
      </section>

      <section>
        <h3>Sobre o país</h3>
        <p>
          Aqui ficará uma descrição estática ou mockada sobre o país.
        </p>
      </section>

      <button>Voltar para a lista</button>
    </div>
  );
}

export default Detail;