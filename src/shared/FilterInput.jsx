import styles from "./FilterInput.module.css";

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className={styles.filter}>
      <label className={styles.formLabel} htmlFor="filterInput">
        Search todos:
      </label>
      <input
        className={styles.formInput}
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
      ></input>
    </div>
  );
}

export default FilterInput;
