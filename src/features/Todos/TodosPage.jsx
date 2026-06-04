import { useEffect, useReducer } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import SortBy from '../../shared/SortBy.jsx';
import useDebounce from '../../utils/useDebounce.js';
import FilterInput from '../../shared/FilterInput.jsx';
import { TODO_ACTIONS, initialTodoState, todoReducer } from '../../reducers/todoReducer.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

function TodosPage() {

const { token } = useAuth();

const [state, dispatch] = useReducer(todoReducer, initialTodoState);
const{
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

function handleFilterChange (filterTerm) {
  dispatch({
    type: TODO_ACTIONS.SET_FILTER,
    payload: {filterTerm},
  })
};


useEffect(() => {
(async function fetchTodos (){
 dispatch({type: TODO_ACTIONS.FETCH_START});
  
  const paramsObject = {
    sortBy, 
    sortDirection,
  };

  if(debouncedFilterTerm){
    paramsObject.find = debouncedFilterTerm;
  }

  const params = new URLSearchParams(paramsObject);
  

  try{
    const resp = await fetch(`/api/tasks?${params}`, {
      method: 'GET',
      headers: {'X-CSRF-TOKEN': token},
      credentials: 'include'
    });
    const todos = await resp.json();
    if(resp.ok ){
      dispatch({
        type: TODO_ACTIONS.FETCH_SUCCESS,
        payload: {todos: todos.tasks}
      }); 
      
    } else if (resp.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Failed to load tasks");
    }
  }
  catch (error) {
    const isFilterError = (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc');

    dispatch({
        type: TODO_ACTIONS.FETCH_ERROR,
        payload: { 
          message: isFilterError ? `Error filtering/sorting todos: ${error.message}` : `Error fetching todos: ${error.message}`,
           isFilterError,
          }
        });
      }
    }());       
},[token, sortBy, sortDirection, debouncedFilterTerm]);

async function addTodo(todoTitle){
  
    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {newTodo},
    });

    try{
      const resp = await fetch('/api/tasks', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json','X-CSRF-TOKEN' : token}, 
        credentials: 'include',
        body: JSON.stringify({title:todoTitle, isCompleted: false}),
      });
      const savedTodoData = await resp.json();
      if(resp.ok){
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_SUCCESS,
          payload: {newTodo, savedTodoData}
        });
      } else {
        throw new Error ('Failed to add todo');
          }
        }
    catch (error) {
    dispatch({
      type: TODO_ACTIONS.ADD_TODO_ERROR,
      payload: {
        newTodo, 
        message: `Error: ${error.name} | ${error.message}`,
      }
    })
    }
    
  }

async function completeTodo(id) {
  const originalTodo = todoList.find(todo => todo.id === id);
  let checkComplete = todoList.map(todo => (todo.id === id ? ({...todo, isCompleted: true}) : todo));

  dispatch({
    type: TODO_ACTIONS.COMPLETE_TODO_START,
    payload: {checkComplete},
  })


  try {
    const resp = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH', 
      headers: {'Content-Type' : 'application/json', 'X-CSRF-TOKEN' : token}, 
      credentials: 'include', 
      body: JSON.stringify({isCompleted: true})
    });
    if (!resp.ok) {
          throw new Error('Failed to complete todo');
        }
      dispatch ({type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS});
  } 
  catch (error) {
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
      payload:{ originalTodo,
        message: `Error: ${error.name} | ${error.message}`
      }
    });
  }
  
  }

async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
    let updatedTodos = todoList.map(todo => (todo.id === editedTodo.id ? ({...editedTodo}) : todo));

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: {updatedTodos},
    })

    try {
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}, 
        credentials: 'include', 
        body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
      });
      if (!resp.ok) {
        throw new Error('Failed to update todo');
      }
      dispatch({type: TODO_ACTIONS.UPDATE_TODO_SUCCESS});    
    }
    catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {originalTodo,
           message:`Error: ${error.name} | ${error.message}`},
      });
    }
   
  }

  function handleResetFilter () {
    dispatch({type: TODO_ACTIONS.RESET_FILTERS});
  }

  return (
    <div>
      {error && 
       <div>
        <p>{error}</p>
        <button onClick={()=> dispatch({type: TODO_ACTIONS.CLEAR_ERROR})}>Clear Error</button>
        </div>}

    {filterError && 
         <div>
          <p>{filterError}</p>
          <button onClick={()=>dispatch({type: TODO_ACTIONS.CLEAR_FILTER_ERROR})}>Clear Filter Error</button>
          <button onClick={handleResetFilter}>Reset Filters</button>
         </div>}

      {isTodoListLoading && <p>Loading...</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) => 
          dispatch({
          type: TODO_ACTIONS.SET_SORT,
          payload: {sortBy: newSortBy, sortDirection}
        })}
        onSortDirectionChange={(newSortDirection) => 
          dispatch({
          type: TODO_ACTIONS.SET_SORT,
          payload: {sortBy, sortDirection: newSortDirection}
        })} />

      <FilterInput 
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange} />

      <TodoForm 
        onAddTodo={addTodo}
        isOperationLoading={isOperationLoading} />

      <TodoList 
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isOperationLoading={isOperationLoading}
        dataVersion={dataVersion}/>

    </div>
  )
}

export default TodosPage;