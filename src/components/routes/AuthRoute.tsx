import { useContext, type JSX } from "react";
import AuthContext from "../../context/auth";
import { Navigate } from "react-router";

export default function AuthRoute({ children }: { children: JSX.Element }) {
    const auth = useContext(AuthContext)

    if(!auth?.isAuthenticated){
        return <Navigate to={'/recipes'} />
    }

    return children
}
