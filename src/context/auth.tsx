import { createContext } from 'react';

type AuthContextTypes = {
	token: string | null;
	login: (token: string) => void;
	logOut: () => void;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export default AuthContext;
