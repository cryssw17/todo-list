function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div className="app-features-section">
        <h2>App Features</h2>
        <ul>
          <li>
            Users are able to add, edit, and delete todos, as well as mark
            finished todos as "completed".
          </li>
          <li>
            Todos can be sorted in ascending or descending order by created date
            or by title.
          </li>
        </ul>
      </div>
      <div className="tech-used-section">
        <h2>Technologies Used</h2>
        <ul>
          <li>Vite</li>
          <li>React</li>
          <li>React Router</li>
        </ul>
      </div>
    </>
  );
}

export default AboutPage;
