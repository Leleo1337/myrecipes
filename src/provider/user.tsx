import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserData } from '../services/user';
import AuthContext from '../context/auth';
import { removeToken } from '../services/auth';

type UserType = {
	username: string | undefined;
	profilePicture?: string | undefined;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const auth = useContext(AuthContext);

	async function fetchUser() {
		try {
			const data = await getUserData();
			setUser(data);
		} catch (error) {
			removeToken();
			console.error('Erro ao buscar usuário:', error);
		}
	}

	useEffect(() => {
		if (!token) return;
		fetchUser();
	}, [token]);

	useEffect(() => {
		if (!auth?.token) return;
		setToken(auth.token);
	}, [auth?.token]);

	return <UserContext.Provider value={{ profilePicture: user?.profilePicture, username: user?.username }}>{children}</UserContext.Provider>;
}
