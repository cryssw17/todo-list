import TodoListItem from "../TodoList/TodoListItem.jsx";
import { useMemo } from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isOperationLoading, dataVersion }) {

  const filteredTodoList = useMemo(() =>
     ({
        version: dataVersion,
        todos: todoList.filter(todo => !todo.isCompleted)
      }), [todoList, dataVersion]);

    return (
      <div>
      {filteredTodoList.todos.length === 0 ? (<p>Add todo above to get started</p>) : (<ul>
        {filteredTodoList.todos.map(todo =>
           <TodoListItem
             key={todo.id}
             todo={todo}
             onCompleteTodo={onCompleteTodo}
             onUpdateTodo={onUpdateTodo} 
             isOperationLoading={isOperationLoading}/>)}
      </ul>)}
      </div>
    );
}

export default TodoList;