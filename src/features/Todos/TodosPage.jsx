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

function addTodo(todoTitle){
    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    setTodoList(prev => [newTodo, ...prev]);

  }

function completeTodo(id) {
  let checkComplete = todoList.map(todo => (todo.id === id ? ({...todo, isCompleted: true}) : todo));

  setTodoList(checkComplete);

  }

function updateTodo(editedTodo) {
    let updatedTodos = todoList.map(todo => (todo.id === editedTodo.id ? ({...editedTodo}) : todo));

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo} />
    </div>
  )
}

export default TodosPage;