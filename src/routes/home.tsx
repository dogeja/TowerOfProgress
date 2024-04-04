import { auth } from "../firebase";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
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
      <Card
        username="김재영"
        userhandle="@flesd"
        contents="안녕하세요?"
        con_img="안녕하다고"
      ></Card>
    </div>
  );
}
