import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usersApi } from '../services/api';
import { User, UserRole } from '../types';
import { useStore } from '../store';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasRole: (roles: UserRole[]) => boolean;
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            useStore.getState().setUser(parsedUser); // Sync with store
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await usersApi.login(email, password);
            const { user: userData, token: authToken } = response;

            setUser(userData);
            setToken(authToken);
            useStore.getState().setUser(userData); // Sync with store

            localStorage.setItem('authToken', authToken);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            // Transform field names to match backend expectations
            const backendData = {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                password_confirm: userData.password, // Backend expects password_confirm
                first_name: userData.firstName,
                last_name: userData.lastName,
            };
            const newUser = await usersApi.register(backendData);
            // Auto-login after registration
            await login(userData.email, userData.password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        useStore.getState().setUser(null); // Sync with store
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    const hasRole = (roles: UserRole[]): boolean => {
        if (!user) return false;
        return roles.includes(user.role);
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
