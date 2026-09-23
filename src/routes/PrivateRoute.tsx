import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Redirection automatique vers /connexion si l'utilisateur n'est pas authentifié
  return isAuthenticated ? <>{children}</> : <Navigate to="/connexion" replace />;
};

export default PrivateRoute;