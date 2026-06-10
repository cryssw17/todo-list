import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx'
import { isValidTodoTitle } from '../../utils/todoValidation.js';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, isOperationLoading }) {
   const [isEditing, setIsEditing] = useState(false);
   const [workingTitle, setWorkingTitle] = useState(todo.title);

   useEffect(()=>{
      setWorkingTitle(todo.title);
   },[todo.title]);

   function handleCancel() {
      setWorkingTitle(todo.title);
      setIsEditing(false);
   }

   function handleEdit(event) {
      setWorkingTitle(event.target.value);
   }

   function handleUpdate() {
      if(!isEditing) {
         return;
      }
      onUpdateTodo({...todo, title:workingTitle})
      setIsEditing(false);
   }

    return(
      <li>
         <form>
            {isEditing ? (
            <>
               <TextInputWithLabel 
                  value={workingTitle} 
                  onChange={handleEdit}
                  elementId="updateTodo"
                  labelText="Todo Update"
                  />
               <button type="button" onClick={handleCancel}>Cancel</button>
               <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle) || isOperationLoading}>Update</button>
            </>
            ) : (
         <>
            <label>
               <input 
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={()=>onCompleteTodo(todo.id)}
                  disabled={isOperationLoading}
                  />
               </label>
            <span onClick={()=> setIsEditing(true)}>{todo.title}</span>
         </>
         )}
         </form>
      </li>
      );
   }
         

export default TodoListItem;