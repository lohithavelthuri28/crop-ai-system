import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    email?: string; // Optional now that we might not always have it in context immediately
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (name: string, token: string) => void;
    logout: () => void;
    changeUsername: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing session
        const storedUser = localStorage.getItem('cropai_user');
        const storedToken = localStorage.getItem('cropai_token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = (name: string, newToken: string) => {
        const newUser = { name }; //  Minimal user info
        setUser(newUser);
        setToken(newToken);
        localStorage.setItem('cropai_user', JSON.stringify(newUser));
        localStorage.setItem('cropai_token', newToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('cropai_user');
        localStorage.removeItem('cropai_token');
    };

    const changeUsername = (name: string) => {
        if (user) {
            const updatedUser = { ...user, name };
            setUser(updatedUser);
            localStorage.setItem('cropai_user', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, changeUsername }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
