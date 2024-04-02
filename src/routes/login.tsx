import { TextField, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubBtn from "../components/github-btn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;
const SignIn = styled.h1`
  font-size: 3rem;
  line-height: 1.325;
  margin-bottom: 1rem;
`;
const ErrorMessage = styled.div`
  font-size: 1rem;
  line-height: 1.325;
  color: red;
  height: 30px;
`;
export default function login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorcode, setErrorcode] = useState(0);
  //   other error = 1
  //   email error = 2
  //   password error =3
  const navigate = useNavigate();
  //hiding password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <SignIn>Login</SignIn>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setError("");
          setErrorcode(0);
          if (isLoading || email === "" || password === "") {
            return;
          }
          try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            setTimeout(() => {
              navigate("/");
            }, 300);
          } catch (e) {
            if (e instanceof FirebaseError) {
              console.log(errorcode);
              switch (e.code) {
                case "auth/user-not-found" || "auth/wrong-password":
                  setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
                  setErrorcode(1);
                  return;
                case "auth/email-already-in-use":
                  setError("이미 사용 중인 이메일입니다.");
                  setErrorcode(2);
                  return;
                case "auth/weak-password":
                  setError("비밀번호는 6글자 이상이어야 합니다.");
                  setErrorcode(3);
                  return;
                case "auth/network-request-failed":
                  setError("네트워크 연결에 실패 하였습니다.");
                  setErrorcode(1);
                  return;
                case "auth/invalid-email":
                  setError("잘못된 이메일 형식입니다.");
                  setErrorcode(2);
                  return;
                case "auth/internal-error":
                  setError("잘못된 요청입니다.");
                  setErrorcode(1);
                  return;
                default:
                  setError("로그인에 실패 하였습니다.");
                  setErrorcode(1);
                  return;
              }
            }
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <EmailOutlinedIcon
            sx={{
              color: "action.active",
              mr: "1",
              my: "0.5",
              marginX: "8px",
            }}
          ></EmailOutlinedIcon>
          <TextField
            name="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            id="outlined-basic"
            label="email"
            variant="outlined"
            required
            error={errorcode == 2 ? true : false}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <KeyOutlinedIcon
            sx={{
              color: "action.active",
              mr: "1",
              my: "0.5",
              marginX: "8px",
            }}
          ></KeyOutlinedIcon>
          <TextField
            name="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            id="outlined-pw"
            label="password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            error={errorcode == 3 ? true : false}
          ></TextField>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            fontSize: "1rem",
            justifyItems: "right",
            margin: "8px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "loading..." : "login!"}
        </Button>
      </form>
      {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <GithubBtn></GithubBtn>
        <div>New to here?</div>
        <Button
          variant="outlined"
          startIcon={<AccountCircleOutlinedIcon />}
          onClick={() => {
            setTimeout(() => {
              navigate("/create-account");
            }, 300);
          }}
          sx={{ justifyItems: "right", margin: "1rem", cursor: "pointer" }}
        >
          Create Account
        </Button>
      </Box>
    </Wrapper>
  );
}
