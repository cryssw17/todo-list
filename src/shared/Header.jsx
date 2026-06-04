import Logoff from '../features/Logoff';
import { useAuth} from '../contexts/AuthContext.jsx';

export default function Header() {
    const {isAuthenticated } = useAuth();
    return (
    <>
    <h1>Todo List</h1>
    {isAuthenticated ? <Logoff /> : null }
    </>
    )
}