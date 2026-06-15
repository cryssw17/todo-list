import { useSearchParams } from "react-router";
import styles from "./StatusFilter.module.css";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all"; //gets current status value, defaults to 'all'

  const handleStatusChange = (status) => {
    if (status === "all") {
      //remove status param for 'all' to keep URL clean
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.status}>
      <label className={styles.formLabel} htmlFor="statusFilter">
        Show:
      </label>
      <select
        className={styles.formSelect}
        id="statusFilter"
        value={currentStatus}
        onChange={(event) => handleStatusChange(event.target.value)}
      >
        <option className={styles.option} value="all">
          All Todos
        </option>
        <option className={styles.option} value="active">
          Active Todos
        </option>
        <option className={styles.option} value="completed">
          Completed Todos
        </option>
      </select>
    </div>
  );
}

export default StatusFilter;
