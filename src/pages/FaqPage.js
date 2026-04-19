function FaqPage({ copy, tag }) {
  return (
    <main className="page-content page-grid">
      <div className="page-intro">
        <span className="page-tag">{tag}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <div className="stack-list">
        {copy.items.map((item) => (
          <article key={item.q} className="info-card">
            <h2>{item.q}</h2>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default FaqPage;
