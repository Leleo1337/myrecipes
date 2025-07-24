import type React from 'react';
import { useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../services/auth';
import AuthContext from '../context/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setTokenState] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = getToken();
		if (storedToken) setTokenState(storedToken);
	}, []);

	const login = (token: string) => {
		setToken(token);
		setTokenState(token);
	};
	const logOut = () => {
		removeToken();
		setTokenState(null);
	};

    return (
        <AuthContext.Provider value={{token, login, logOut, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    ) 
}
