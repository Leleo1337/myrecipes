import type { loginForm, registerForm } from '../types/auth';
import api from './api';

export async function register(formData: registerForm) {
	if (formData.password !== formData.confirmation) {
		throw Error('Passwords do not match');
	}
	const dataTosend = { ...formData };
	delete dataTosend.confirmation;

	try {
		const response = await api.post(`/api/v1/auth/register`, dataTosend);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function login(formData: loginForm) {
	let method = 'name';
	if (formData.user.includes('@')) method = 'email';

	const dataTosend = { [method]: formData.user, password: formData.password };
	try {
		const response = await api.post(`/api/v1/auth/login`, dataTosend);
		const token = response.data.token;
		if (!token) throw Error('Token ausente na resposta');
		setToken(token);
	} catch (err) {
		throw err;
	}
}

export function setToken(token: string) {
	return localStorage.setItem('authToken', token);
}

export function getToken() {
	return localStorage.getItem('authToken');
}

export function removeToken() {
	return localStorage.removeItem('authToken');
}
