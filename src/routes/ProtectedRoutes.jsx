import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ tipoPermitido, children }) => {
  const { usuario } = useAuth();

  const tipos = Array.isArray(tipoPermitido) ? tipoPermitido : [tipoPermitido];

  if (!usuario || !tipos.includes(usuario.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
