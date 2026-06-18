import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import { isValidTodoTitle } from "../../utils/todoValidation.js";
import styles from "./TodoListItem.module.css";
import DOMPurify from "dompurify";

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  isOperationLoading,
  onDeleteTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [error, setError] = useState("");

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo.title]);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate() {
    if (!isEditing) {
      return;
    }
    if (!isValidTodoTitle(workingTitle)) {
      setError("No todo entered. Please try again.");
      return;
    }

    if (workingTitle.trim().length > 70) {
      setError("Todo cannot exceed 70 characters.");
      return;
    }

    const sanitizedWorkingTitle = DOMPurify.sanitize(workingTitle.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    onUpdateTodo({ ...todo, title: sanitizedWorkingTitle });
    setIsEditing(false);
  }

  function handleDelete() {
    onDeleteTodo(todo.id);
  }

  return (
    <li>
      <form>
        {error && <p className="errorMessage">{error}</p>}
        {isEditing ? (
          <div className={styles.editingTodo}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId="updateTodo"
              labelText="Update todo:"
              maxLength="70"
            />
            <div className={styles.btnGroup}>
              <button
                className={styles.cancelBtn}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={styles.updateBtn}
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle) || isOperationLoading}
              >
                Update
              </button>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={handleDelete}
                disabled={isOperationLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.todoItem}>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
                disabled={isOperationLoading}
              />
            </label>
            {/* Accessibility: button instead of span so todo title is keyboard navigable */}
            <button
              className={todo.isCompleted ? styles.completedTodo : styles.todo}
              onClick={() => setIsEditing(true)}
              type="button"
            >
              {todo.title}
            </button>
          </div>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
