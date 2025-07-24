import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { AuthProvider } from './provider/auth.tsx';
import { UserProvider } from './provider/user.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</AuthProvider>
	</StrictMode>,
);
