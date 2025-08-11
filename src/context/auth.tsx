import { createContext } from 'react';
import type { AuthContextTypes } from '../types/context';

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export default AuthContext;
