import {useRef} from 'react';
import {useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import isValidTodoTitle from '../utils/todoValidation.js';


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
            <TextInputWithLabel
                ref={inputRef}
                value={workingTodoTitle}
                onChange={handleChange}
                elementId="todoTitle"
                labelText="Todo"
            />
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
    );
}

export default TodoForm;