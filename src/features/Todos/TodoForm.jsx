import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation.js";
import styles from "./TodoForm.module.css";

function TodoForm({ onAddTodo, isOperationLoading }) {
  const inputRef = useRef(null);

  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (workingTodoTitle) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };

  function handleChange(event) {
    setWorkingTodoTitle(event.target.value);
  }

  return (
    <form className={styles.todoForm} onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={handleChange}
        elementId="todoTitle"
        labelText="Todo: "
        placeholder="Add a new todo"
      />
      <button
        className={styles.todoBtn}
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle) || isOperationLoading}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
