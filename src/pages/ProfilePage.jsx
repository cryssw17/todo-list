import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage(){
    const {email, token} = useAuth();
    const username = email;

    const [loading, setLoading] = useState(false);
    const [todoStats, setTodoStats] = useState({
        total: 0,
        completed:0,
        active:0
    });
    const [error, setError] = useState('');


    useEffect(() => {
        async function fetchTodoStats(){
            if(!token) return;

            try {
                setLoading(true);
                setError('');

                const options = {
                    method: 'GET',
                    headers: { 'X-CSRF-TOKEN' : token },
                    credentials: 'include',
                };

                const statsResp = await fetch('/api/tasks?limit=50', options);

                if (statsResp.status === 401) {
                    throw new Error('Unauthorized');
                }

                const todos = await statsResp.json();

                //calculate stats
                const total = todos.tasks.length;
                const completed = todos.tasks.filter((todo) => todo.isCompleted).length;
                const active = total - completed;

                setTodoStats({total, completed, active});
            } catch (error) {
                setError(`Error loading statistics: ${error.message} `);
            } finally {
                setLoading(false);
            }
        }

        fetchTodoStats();
    }, [token]);

    const percentage = todoStats.total > 0 ? Math.floor((todoStats.completed / todoStats.total) *100) : 0;

    return(
        <>
        <h2>Username: {username} </h2>

        <h2>Todo Statistics</h2>
        {loading && <p>Loading Stats...</p>}

        {error && <p>{error}</p>}

        <p>Active Todos: {todoStats.active} </p>
        <p>Completed Todos: {todoStats.completed} </p>
        <p>Total Todos: {todoStats.total}</p>
        <p>Percentage of todos completed: {percentage} %</p>
        
        </>

    );
}

export default ProfilePage;