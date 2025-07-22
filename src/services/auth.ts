import axios from 'axios';
import type { loginForm, registerForm } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export async function register(formData: registerForm) {
	if (formData.password !== formData.confirmation) {
		throw Error('Passwords do not match');
	}
	const dataTosend = { ...formData };
	delete dataTosend.confirmation;

	try {
		const response = await axios.post(`${API_URL}/api/v1/auth/register`, dataTosend);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function login(formData: loginForm) {
	let method = 'name';
	if (formData.user.includes('@')) method = 'email';

	const dataTosend = { [method]: formData.user, password: formData.password };
	try {
		const response = await axios.post(`${API_URL}/api/v1/auth/login`, dataTosend);
		const token = response.data.token;
		if (!token) throw Error('Token ausente na resposta');
		setToken(token);
	} catch (error) {
		console.log(error);
		throw error;
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
