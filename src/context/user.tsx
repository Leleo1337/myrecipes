import { createContext } from 'react';
import type { UserContextType } from '../types/context';

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
