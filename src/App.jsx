import './App.css'

function App() {
const todoList = [
  {id: 1, title: "clean room"},
  {id: 2, title: "do laundry"},
  {id: 3, title: "study"},
]
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
