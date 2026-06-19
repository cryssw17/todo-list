import { useRef } from "react";
import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation.js";
import styles from "./TodoForm.module.css";
import DOMPurify from "dompurify";

function TodoForm({ onAddTodo, isOperationLoading }) {
  const inputRef = useRef(null);

  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const [error, setError] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      setError("No todo entered. Please try again.");
      return;
    }

    if (workingTodoTitle.trim().length > 70) {
      setError("Todo cannot exceed 70 characters.");
      return;
    }

    const sanitizedWorkingTodoTitle = DOMPurify.sanitize(
      workingTodoTitle.trim(),
      {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      },
    );

    onAddTodo(sanitizedWorkingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  };

  function handleChange(event) {
    setWorkingTodoTitle(event.target.value);
    setError("");
  }

  return (
    <form className={styles.todoForm} onSubmit={handleAddTodo}>
      {error && <p className="errorMessage">{error}</p>}

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
        disabled={isOperationLoading}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
