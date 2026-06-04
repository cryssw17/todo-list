import {useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useAuth } from '../contexts/AuthContext.jsx'

function Logon () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    const { login } = useAuth();

    async function handleSubmit(event){
        event.preventDefault();
        setIsLoggingOn(true);
        const loginRequest = await login(email, password);
        if(!loginRequest.success){
            setAuthError(loginRequest.error)
        }
        setIsLoggingOn(false);
    }

    function handleEmailChange (event) {
            setEmail(event.target.value);
        } 



    function handlePasswordChange (event) {
            setPassword(event.target.value);
        } 
        
    

    return(
        <form onSubmit={handleSubmit}>
            {authError && <p>{authError}</p>}
            
            <TextInputWithLabel 
              value={email}
              onChange={handleEmailChange}
              elementId="email"
              labelText="Email:"
              required
            />

            <TextInputWithLabel
              type="password"
              value={password}
              onChange={handlePasswordChange}
              elementId="password"
              labelText="Password:"
              required
            />

            <button type="submit" disabled={isLoggingOn}>{isLoggingOn ? "Logging in...." : "Log On"}</button>
            
        </form>
    )
}

export default Logon;