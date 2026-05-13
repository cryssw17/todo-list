import './App.css'
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import {useState} from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
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

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  )
}

export default App;
