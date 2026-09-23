import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface GuestRouteProps{
    children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
    const loggedUser = useSelector ((state: RootState) => state.auth.isAuthenticated);

    return loggedUser ? <Navigate to ="/" replace /> : <>{children}</>;
};

export default GuestRoute;