// src/routes/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
	children?: ReactNode;
	authRequired?: boolean; // true = private, false = public
	redirectPath?: string; // optional redirect path
}

const ProtectedRoute = ({
	children,
	authRequired = true,
	redirectPath,
}: Props) => {
	const token = useSelector((state: RootState) => state.auth.token);

	// If authRequired (private route) and no token → redirect to login
	if (authRequired && !token) {
		return <Navigate to={redirectPath || "/login"} replace />;
	}

	// If public route (authRequired = false) and user is logged in → redirect to dashboard
	if (!authRequired && token) {
		return <Navigate to={redirectPath || "/dashboard"} replace />;
	}

	// Otherwise, render children
	return <>{children}</>;
};

export default ProtectedRoute;
