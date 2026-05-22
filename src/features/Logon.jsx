import {useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function Logon ({onSetEmail, onSetToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(event){
        event.preventDefault();
        setIsLoggingOn(true);
        try{
            const resp = await fetch('/api/users/logon', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify({email, password})
            });
            const data = await resp.json();
            if(resp.status === 200 && data.name && data.csrfToken) {
                onSetEmail(data.name);
                onSetToken(data.csrfToken);
            } else {
                setAuthError(`Authentication failed: ${data?.message}`);
            }
        }
        catch(error){
            setAuthError(`Error: ${error.name} | ${error.message}`);
        }
        finally {
            setIsLoggingOn(false);
        }
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