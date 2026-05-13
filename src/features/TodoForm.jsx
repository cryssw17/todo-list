import {useRef} from 'react';
import {useState} from 'react';

function TodoForm({onAddTodo}){
    const inputRef = useRef(null);

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (workingTodoTitle) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
            inputRef.current.focus();
        }
    };

    function handleChange (event) {
        setWorkingTodoTitle(event.target.value)
    }

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
                ref={inputRef}
                type="text"
                id="todoTitle"
                name="todoTitle"
                placeholder={'Todo Text'}
                value={workingTodoTitle}
                onChange={handleChange}
                required />
            <button type="submit" disabled={!workingTodoTitle.trim()}>Add Todo</button>
        </form>
    );
}

export default TodoForm;