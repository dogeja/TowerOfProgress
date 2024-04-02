import { auth } from "../firebase";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  return (
    <div>
      <h1>HOME</h1>
      <Button size="small" onClick={logOut}>
        logout
      </Button>
    </div>
  );
}
