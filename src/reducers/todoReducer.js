export const TODO_ACTIONS = {
    //Fetch operations
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',

    //Add todo operations
    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',
    
    //complete todo operations
    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

    //update todo operations
    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

    //UI operations
    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    CLEAR_FILTER_ERROR: 'CLEAR_FILTER_ERROR',
    RESET_FILTERS: 'RESET_FILTERS',
};

export const initialTodoState = {
    todoList: [],
    error: '',
    isTodoListLoading: false,
    isOperationLoading: false,
    sortBy: 'creationDate',
    sortDirection: 'desc',
    filterTerm: '',
    dataVersion: 0,
    filterError: '',
}


export function todoReducer(state, action) {
    switch(action.type) {
        //fetch todo actions
        case TODO_ACTIONS.FETCH_START:
            return{
                ...state, 
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };
        
        case TODO_ACTIONS.FETCH_SUCCESS:
            return{
                ...state, 
                isTodoListLoading: false,
                todoList: action.payload.todos,
                filterError: ''
            };

        case TODO_ACTIONS.FETCH_ERROR:
            return{
                ...state,
                isTodoListLoading: false, 
                error: action.payload.isFilterError ? '': action.payload.message,
                filterError: action.payload.isFilterError ? action.payload.message : '',
            };

        
        //add todo actions
        case TODO_ACTIONS.ADD_TODO_START:
            return{
                ...state,
                isOperationLoading: true, 
                todoList: [action.payload.newTodo, ...state.todoList],
                error: '',
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return{
                ...state,
                isOperationLoading: false,
                todoList: state.todoList.map((todo) => todo.id === action.payload.newTodo.id ? action.payload.savedTodoData : todo),
                dataVersion: state.dataVersion + 1, 
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return{
                ...state, 
                isOperationLoading: false, 
                todoList: state.todoList.filter((todo) => todo.id !== action.payload.newTodo.id),
                error: action.payload.message
            }

        
        //complete todo actions
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return{
                ...state, 
                isOperationLoading: true, 
                todoList: action.payload.checkComplete,
                error: ''
            }

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return{
                ...state,
                isOperationLoading: false, 
                dataVersion: state.dataVersion + 1,
            }
        
        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return{
                ...state,
                isOperationLoading: false, 
                todoList: state.todoList.map((todo) => todo.id === action.payload.originalTodo.id ? 
                action.payload.originalTodo : todo),
                error: action.payload.message
            }

        //update todo actions
        case TODO_ACTIONS.UPDATE_TODO_START:
            return{
                ...state,
                isOperationLoading: true,
                todoList: action.payload.updatedTodos,
                error: ''
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return{
                ...state,
                isOperationLoading: false,
                dataVersion: state.dataVersion + 1,
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return{
                ...state,
                isOperationLoading: false,
                todoList: state.todoList.map((todo) => todo.id === action.payload.originalTodo.id ? action.payload.originalTodo : todo),
                error: action.payload.message
            };

        //UI operations
        case TODO_ACTIONS.SET_SORT:
            return{
                ...state,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.sortDirection,
            };

        case TODO_ACTIONS.SET_FILTER:
            return{
                ...state,
                filterTerm: action.payload.filterTerm,
            };

        case TODO_ACTIONS.CLEAR_ERROR:
            return{
                ...state,
                error: '',
            };
        
        case TODO_ACTIONS.CLEAR_FILTER_ERROR:
            return{
                ...state,
                filterError: '',
            }

        case TODO_ACTIONS.RESET_FILTERS:
            return{
                ...state,
                filterTerm: '',
                sortBy: 'creationDate',
                sortDirection: 'desc',
                filterError: '',
            };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

