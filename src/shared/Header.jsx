import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navigation from './Navigation.jsx';

export default function Header() {
    const { isAuthenticated } = useAuth();
    return (
    <>
    <h1>Todo List</h1>
    <Navigation />
    {isAuthenticated ? <Logoff /> : null}
    </>
    )
}