import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function RequireAuth ({ children }){
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            //passes current location to login for user redirection after successful login
            navigate('/login', {state: {from: location}});  
        }
    }, [isAuthenticated, navigate, location]);

    return(
        <>
        {isAuthenticated ? children : <p>Redirecting to Login...</p>}
        </>
    )
};

export default RequireAuth;
