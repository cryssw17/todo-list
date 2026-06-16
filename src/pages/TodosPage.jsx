import { useEffect, useReducer } from "react";
import TodoForm from "../features/Todos/TodoForm.jsx";
import TodoList from "../features/Todos/TodoList.jsx";
import SortBy from "../shared/SortBy.jsx";
import useDebounce from "../utils/useDebounce.js";
import FilterInput from "../shared/FilterInput.jsx";
import {
  TODO_ACTIONS,
  initialTodoState,
  todoReducer,
} from "../reducers/todoReducer.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useSearchParams } from "react-router";
import StatusFilter from "../shared/StatusFilter.jsx";
import styles from "./TodosPage.module.css";

function TodosPage() {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [searchParams] = useSearchParams();

  //Get status filter from URL, defaults to 'all'
  const statusFilter = searchParams.get("status") || "all";

  const {
    todoList,
    error,
    isTodoListLoading,
    isOperationLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
    filterError,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  function handleFilterChange(filterTerm) {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm },
    });
  }

  useEffect(() => {
    (async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      const paramsObject = {
        sortBy,
        sortDirection,
      };

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }

      const params = new URLSearchParams(paramsObject);

      try {
        const resp = await fetch(`/api/tasks?limit=25&${params}`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });
        const todos = await resp.json();
        console.log(todos);
        if (resp.ok) {
          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            payload: { todos: todos.tasks },
          });
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("Failed to load tasks");
        }
      } catch (error) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== "createdDate" ||
          sortDirection !== "asc";

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    })();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { newTodo },
    });

    try {
      const resp = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      });
      const savedTodoData = await resp.json();
      if (resp.ok) {
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_SUCCESS,
          payload: { newTodo, savedTodoData },
        });
      } else {
        throw new Error("Failed to add todo");
      }
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          newTodo,
          message: `Error: ${error.name} | ${error.message}`,
        },
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    //toggle check box for completed tasks/ uncheck box for uncompleted (active) tasks
    let checkComplete = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: checkComplete,
    });

    try {
      const resp = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({ isCompleted: !originalTodo.isCompleted }),
      });

      const completedResp = await resp.json();
      console.log(completedResp);

      if (!resp.ok) {
        throw new Error("Failed to complete todo");
      }
      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo,
          message: `Error: ${error.name} | ${error.message}`,
        },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    let updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo,
    );

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: updatedTodos,
    });

    try {
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });
      if (!resp.ok) {
        throw new Error("Failed to update todo");
      }
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          originalTodo,
          message: `Error: ${error.name} | ${error.message}`,
        },
      });
    }
  }

  async function deleteTodo(id) {
    try {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_START,
      });

      const resp = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { "X-CSRF-TOKEN": token },
        credentials: "include",
      });

      if (resp.status === 401) {
        throw new Error("Unauthorized");
      }
      if (!resp.ok) {
        throw new Error("Failed to deleted todo");
      }
      dispatch({ type: TODO_ACTIONS.DELETE_TODO_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_ERROR,
        payload: { message: `Error: ${error.name} | ${error.message}` },
      });
    }
  }

  function handleResetFilter() {
    dispatch({ type: TODO_ACTIONS.RESET_FILTERS });
  }

  return (
    <div className="pageCard">
      <div className={styles.pageContent}>
        <div className={styles.todosHeader}>
          {error && (
            <div className={styles.error}>
              <p className="errorMessage">{error}</p>
              <button
                className={styles.btn}
                onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
              >
                Clear Error
              </button>
            </div>
          )}

          {filterError && (
            <div className={styles.error}>
              <p className="errorMessage">{filterError}</p>
              <button
                className={styles.btn}
                onClick={() =>
                  dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })
                }
              >
                Clear Filter Error
              </button>
              <button className={styles.btn} onClick={handleResetFilter}>
                Reset Filters
              </button>
            </div>
          )}

          {isTodoListLoading && <p className="loadingMessage">Loading...</p>}

          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={(newSortBy) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: { sortBy: newSortBy, sortDirection },
              })
            }
            onSortDirectionChange={(newSortDirection) =>
              dispatch({
                type: TODO_ACTIONS.SET_SORT,
                payload: { sortBy, sortDirection: newSortDirection },
              })
            }
          />

          <StatusFilter />

          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handleFilterChange}
          />

          <TodoForm
            onAddTodo={addTodo}
            isOperationLoading={isOperationLoading}
          />
        </div>
        <div className={styles.todoList}>
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            isOperationLoading={isOperationLoading}
            dataVersion={dataVersion}
            statusFilter={statusFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default TodosPage;
