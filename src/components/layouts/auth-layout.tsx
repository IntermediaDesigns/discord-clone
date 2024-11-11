import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
