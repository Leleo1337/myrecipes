import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getLoggedInUserData } from '../services/user';
import AuthContext from '../context/auth';
import { removeToken } from '../services/auth';

type UserType = {
	userID: string | undefined;
	username: string | undefined;
	profilePicture?: string | undefined;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserType | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const auth = useContext(AuthContext);

	async function fetchUser() {
		try {
			const data = await getLoggedInUserData();
			setUser({ userID: data._id, profilePicture: data.profilePicture, username: data.name });
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

	return (
		<UserContext.Provider value={{ userID: user?.userID, profilePicture: user?.profilePicture, username: user?.username }}>{children}</UserContext.Provider>
	);
}
