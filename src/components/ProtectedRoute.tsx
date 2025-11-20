import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
    roles?: UserRole[];
}

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading, hasRole } = useAuth();

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div className="spinner" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !hasRole(roles)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
