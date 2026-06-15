import styles from "./AboutPage.module.css";
function AboutPage() {
  return (
    <div className="pageCard">
      <h1>About</h1>
      <div className={styles.sections}>
        <div className={styles.features}>
          <h2>App Features</h2>
          <ul>
            <li>
              Users are able to add, edit, and delete todos, as well as mark
              finished todos as "completed".
            </li>
            <li>
              Todos can be sorted in ascending or descending order by created
              date or by title.
            </li>
          </ul>
        </div>
        <div className={styles.tech}>
          <h2>Technologies Used</h2>
          <ul>
            <li>Vite</li>
            <li>React</li>
            <li>React Router</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
