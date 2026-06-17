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
        maxLength="255"
      ></input>
    </div>
  );
}

export default FilterInput;
