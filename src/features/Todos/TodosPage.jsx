import {useState} from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function TodosPage() {
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