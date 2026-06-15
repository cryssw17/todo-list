import styles from "./FilterInput.module.css";

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="formGroup">
      <label className="formLabel" htmlFor="filterInput">
        Search todos:
      </label>
      <input
        className="formInput"
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
