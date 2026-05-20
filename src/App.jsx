import './App.css'
import TodosPage from './features/Todos/TodosPage.jsx';
import Header from './shared/Header.jsx';
import Logon from './features/Logon.jsx';
import {useState} from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <div>
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail} />

      {token ? <div><TodosPage token={token}/></div> : <div><Logon onSetEmail={setEmail} onSetToken={setToken} /></div>}
       
    </div>
  )
}

export default App;
