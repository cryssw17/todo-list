function TodoList() {
    const todoList = [
    {id: 1, title: "clean room"},
    {id: 2, title: "do laundry"},
    {id: 3, title: "study"},
    ]
    return (
        <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    );
}

export default TodoList;