import {useState, useEffect} from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function TodosPage({token}) {
const [todoList, setTodoList] = useState([]);
const [error, setError] = useState('');
const [isTodoListLoading, setIsTodoListLoading] = useState(false);


useEffect(() => {
(async function fetchTodos (){
  setIsTodoListLoading(true);
  try{
    const resp = await fetch('/api/tasks', {
      method: 'GET',
      headers: {'X-CSRF-TOKEN': token},
      credentials: 'include'
    });
    const data = await resp.json();
    if(resp.status === 200 ){
      setTodoList(data.tasks)
    } else if (resp.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Failed to load tasks");
    }
  }
  catch (error) {
    setError(`Error: ${error.name} | ${error.message}`);
  }
  finally {
    setIsTodoListLoading(false);
  }
}());

},[token]);

async function addTodo(todoTitle){
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
      if(resp.status === 200){
        setTodoList(prev => prev.map(todo => todo.id === newTodo.id ? data : todo));
      } else {
        setTodoList(prev => prev.filter(todo => todo.id !== newTodo.id));
        setError("Failed to add todo");
      }
    }
    catch (error) {
    setError(`Error: ${error.name} | ${error.message}`);
    }

  }

async function completeTodo(id) {
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
  } 
  catch (error) {
    setTodoList(prev => prev.map(todo => todo.id === id ? originalTodo : todo));
    setError(`Error: ${error.name} | ${error.message}`);
  }

  }

async function updateTodo(editedTodo) {
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
    }
    catch (error) {
      setTodoList(prev => prev.map(todo => todo.id === editedTodo.id ? originalTodo : todo));
      setError(`Error: ${error.name} | ${error.message}`);
    }
  }

  return (
    <div>
      {error && 
       <div>
        <p>{error}</p>
        <button onClick={() => setError('')}>Clear Error</button>
        </div>}

      {isTodoListLoading && <p>Loading...</p>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo} />
    </div>
  )
}

export default TodosPage;