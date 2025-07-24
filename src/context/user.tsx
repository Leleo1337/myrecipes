import { createContext } from "react";

type UserContextType = {
    profilePicture: string | undefined
    username: string | undefined
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export default UserContext