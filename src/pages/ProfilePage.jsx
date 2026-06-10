import { useAuth } from '../contexts/AuthContext';

function ProfilePage(){
    const {email, token} = useAuth();
    const username = email;

    return(
        <>
        <h2>Username: {username} </h2>

        <h2>Todo Statistics:</h2>
        <h3>Active Todos: </h3>
        <h3>Completed Todos: </h3>
        <h3>Total Todos: </h3>
        
        </>

    );
}

export default ProfilePage;