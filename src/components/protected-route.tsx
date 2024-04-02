import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  onAuthStateChanged(auth, (user) => {
    if (user === null) {
    }
    return <Navigate to="/login" />;
  });
  return children;
}
