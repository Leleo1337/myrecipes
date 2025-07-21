import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function register(formData: { name: string; email: string; password: string }) {
	try {
		const response = await axios.post(`${API_URL}/api/v1/auth/register`, formData);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function login(formData: { name: string; email: string; password: string }) {
	try {
		const response = await axios.post(`${API_URL}/api/v1/auth/register`, formData);
		const token = response.data.token;
		localStorage.setItem('authToken', token);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
