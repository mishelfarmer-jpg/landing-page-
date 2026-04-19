function BlogsPage({ copy, tag }) {
  return (
    <main className="page-content page-grid">
      <div className="page-intro">
        <span className="page-tag">{tag}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <div className="card-grid">
        {copy.posts.map((post) => (
          <article key={post.title} className="info-card">
            <span className="card-meta">{post.meta}</span>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default BlogsPage;
