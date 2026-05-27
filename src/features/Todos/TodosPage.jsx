import {useState, useEffect, useCallback} from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import SortBy from '../../shared/SortBy.jsx';
import useDebounce from '../../utils/useDebounce.js';
import FilterInput from '../../shared/FilterInput.jsx';

function TodosPage({token}) {
const [todoList, setTodoList] = useState([]);
const [error, setError] = useState('');
const [isTodoListLoading, setIsTodoListLoading] = useState(false);
const [isOperationLoading, setIsOperationLoading] = useState(false);
const [sortBy, setSortBy] = useState('creationDate');
const [sortDirection, setSortDirection] = useState('desc');
const [filterTerm, setFilterTerm] = useState('');
const [dataVersion, setDataVersion] = useState(0);
const [filterError, setFilterError] = useState('');

const debouncedFilterTerm = useDebounce(filterTerm, 300);

function handleFilterChange (newTerm) {
  return setFilterTerm(newTerm);
};

const invalidateCache = useCallback (() => {
  setDataVersion(prev => prev + 1);
  console.log("Invalidating memo cache after todo mutation");
},[]);


useEffect(() => {
(async function fetchTodos (){
  setIsTodoListLoading(true);
  
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
    const data = await resp.json();
    if(resp.ok ){
      setTodoList(data.tasks)
      setFilterError('');
    } else if (resp.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Failed to load tasks");
    }
  }
  catch (error) {
    if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc'){
      setFilterError(`Error filtering/sorting todos: ${error.message}`);
    } else {
      setError(`Error fetching todos: ${error.message}`);
    }
  }
  finally {
    setIsTodoListLoading(false);
  }
}());

},[token, sortBy, sortDirection, debouncedFilterTerm]);

async function addTodo(todoTitle){
  setIsOperationLoading(true);
    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    setTodoList(prev => [newTodo, ...prev]);

    try{
      const resp = await fetch('/api/tasks', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json','X-CSRF-TOKEN' : token}, 
        credentials: 'include',
        body: JSON.stringify({title:todoTitle, isCompleted: false}),
      });
      const data = await resp.json();
      if(resp.ok){
        setTodoList(prev => prev.map(todo => todo.id === newTodo.id ? data : todo));
        invalidateCache();
      } else {
        setTodoList(prev => prev.filter(todo => todo.id !== newTodo.id));
        setError("Failed to add todo");
      }
    }
    catch (error) {
    setError(`Error: ${error.name} | ${error.message}`);
    }
    finally {
      setIsOperationLoading(false);
    }
  }

async function completeTodo(id) {
  setIsOperationLoading(true);

  const originalTodo = todoList.find(todo => todo.id === id);

  let checkComplete = todoList.map(todo => (todo.id === id ? ({...todo, isCompleted: true}) : todo));

  setTodoList(checkComplete);


  try {
    const resp = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH', 
      headers: {'Content-Type' : 'application/json', 'X-CSRF-TOKEN' : token}, 
      credentials: 'include', 
      body: JSON.stringify({isCompleted: true})
    });
    if (!resp.ok) {
      setTodoList(prev => prev.map(todo => todo.id === id ? originalTodo : todo ));
      setError("Failed to complete todo");
    }
    else {
      invalidateCache();
    }
  } 
  catch (error) {
    setTodoList(prev => prev.map(todo => todo.id === id ? originalTodo : todo));
    setError(`Error: ${error.name} | ${error.message}`);
  }
  finally {
    setIsOperationLoading(false);
  }
  }

async function updateTodo(editedTodo) {
    setIsOperationLoading(true);
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);

    let updatedTodos = todoList.map(todo => (todo.id === editedTodo.id ? ({...editedTodo}) : todo));

    setTodoList(updatedTodos);

    try {
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}, 
        credentials: 'include', 
        body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
      });
      if (!resp.ok) {
        setTodoList(prev => prev.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
      }
      else {
        invalidateCache();
      }
    }
    catch (error) {
      setTodoList(prev => prev.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
      setError(`Error: ${error.name} | ${error.message}`);
    }
    finally{
      setIsOperationLoading(false);
    }
  }

  function handleResetFilter () {
    setFilterTerm('');
    setSortBy('creationDate');
    setSortDirection('desc');
    setFilterError('');
  }

  return (
    <div>
      {error && 
       <div>
        <p>{error}</p>
        <button onClick={() => setError('')}>Clear Error</button>
        </div>}

    {filterError && 
         <div>
          <p>{filterError}</p>
          <button onClick={() => setFilterError('')}>Clear Filter Error</button>
          <button onClick={handleResetFilter}>Reset Filters</button>
         </div>}

      {isTodoListLoading && <p>Loading...</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection} />

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