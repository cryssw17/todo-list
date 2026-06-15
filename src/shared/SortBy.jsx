import styles from "./SortBy.module.css";

function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className={styles.sort}>
      <div className={styles.sortby}>
        <label className={styles.formLabel} htmlFor="sortBy">
          Sort by
        </label>
        <select
          className={styles.formSelect}
          id="sortBy"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
        >
          <option className={styles.option} value="createdDate">
            Creation Date
          </option>
          <option className={styles.option} value="title">
            Title
          </option>
        </select>
      </div>

      <div className={styles.sortdirection}>
        <label className={styles.formLabel} htmlFor="sortDirection">
          Order
        </label>
        <select
          className={styles.formSelect}
          id="sortDirection"
          value={sortDirection}
          onChange={(event) => onSortDirectionChange(event.target.value)}
        >
          <option className={styles.option} value="desc">
            Descending
          </option>
          <option className={styles.option} value="asc">
            Ascending
          </option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;
