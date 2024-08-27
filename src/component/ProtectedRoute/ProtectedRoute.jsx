import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserSessionContext } from '../context/UserSessionProvider';

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useContext(UserSessionContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
