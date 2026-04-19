function ContactPage({ copy, tag }) {
  return (
    <main className="page-content page-grid">
      <div className="page-intro">
        <span className="page-tag">{tag}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <div className="card-grid">
        {copy.cards.map((card) => (
          <article key={card.title} className="info-card">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default ContactPage;
