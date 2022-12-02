import useAuth from "hooks/useAuth";
import AuthRoutes from "./Auth";
import UserRoutes from "./User";

const Router = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (auth) return <UserRoutes />;

  return <AuthRoutes />;
};

export default Router;
