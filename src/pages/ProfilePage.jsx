import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { name, token } = useAuth();
  const username = name;

  const [loading, setLoading] = useState(false);
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const statsResp = await fetch("/api/tasks?limit=50", options);

        if (statsResp.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!statsResp.ok) {
          throw new Error("Failed to fetch todos");
        }

        const todos = await statsResp.json();

        //calculate stats
        const total = todos.tasks.length;
        const completed = todos.tasks.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (error) {
        setError(`Error loading statistics: ${error.message} `);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const percentage =
    todoStats.total > 0
      ? Math.floor((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <div className="pageCard">
      <div className={styles.profileContent}>
        <h1 className="pageTitle">Profile</h1>
        <div className={styles.userInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Username: </span>
            <span className={styles.value}>{username} </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status: </span>
            <span className={styles.value}> Active</span>
          </div>
        </div>

        {loading && <p className="loadingMessage">Loading Stats...</p>}

        {error && <p className="errorMessage">{error}</p>}

        <div className={styles.stats}>
          <h2 className={styles.statsTitle}>Todo Statistics</h2>
          <div className={styles.statsGrid}>
            <p>Active Todos: {todoStats.active} </p>
            <p>Completed Todos: {todoStats.completed} </p>
            <p>Total Todos: {todoStats.total}</p>
            <p>Percentage completed: {percentage} %</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
