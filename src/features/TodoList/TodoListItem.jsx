import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import { isValidTodoTitle } from "../../utils/todoValidation.js";
import styles from "./TodoListItem.module.css";

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  isOperationLoading,
  onDeleteTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

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
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  function handleDelete() {
    onDeleteTodo(todo.id);
  }

  return (
    <li>
      <form>
        {isEditing ? (
          <div className={styles.editingTodo}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId="updateTodo"
              labelText="Update todo:"
            />
            <button className={styles.btn} type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={styles.btn}
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
            <span
              className={todo.isCompleted ? styles.completedTodo : styles.todo}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
          </div>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
