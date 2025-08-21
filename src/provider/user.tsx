import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { fetchLoggedInUserData } from '../services/user';
import AuthContext from '../context/auth';
import { removeToken } from '../services/auth';
import type { UserDataType } from '../types/context';

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserDataType | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const auth = useContext(AuthContext);

	async function getUserData() {
		try {
			const data = await fetchLoggedInUserData();
			setUser({ userID: data._id, profilePicture: data.profilePicture, username: data.name });
		} catch (error) {
			removeToken();
			console.error('Erro ao buscar usuário:', error);
		}
	}

	useEffect(() => {
		if (!token) return;
		getUserData();
	}, [token]);

	useEffect(() => {
		if (!auth?.token) return;
		setToken(auth.token);
	}, [auth?.token]);

	return (
		<UserContext.Provider value={{ userID: user?.userID, profilePicture: user?.profilePicture, username: user?.username, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
