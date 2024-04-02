import { TextField, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

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
export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorcode, setErrorcode] = useState(0);
  //   other error = 1
  //   email error = 2
  //   password error =3
  const navigate = useNavigate();

  return (
    <Wrapper>
      <SignIn>Sign in</SignIn>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setError("");
          setErrorcode(0);
          if (isLoading || name === "" || email === "" || password === "") {
            return;
          }
          try {
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log(credentials.user);
            await updateProfile(credentials.user, {
              displayName: name,
            });
            navigate("/");
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
          <AccountCircleOutlinedIcon
            sx={{
              color: "action.active",
              mr: "1",
              my: "0.5",
              marginX: "8px",
            }}
          ></AccountCircleOutlinedIcon>
          <TextField
            name="name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            id="outlined-basic"
            label="name"
            variant="outlined"
            required={true}
            autoFocus
            error={errorcode == 1 ? true : false}
          ></TextField>
        </Box>
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
            id="outlined-basic"
            label="password"
            variant="outlined"
            required
            error={errorcode == 3 ? true : false}
          ></TextField>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          sx={{ justifyItems: "right", margin: "8px", cursor: "pointer" }}
        >
          {isLoading ? "loading..." : "create account!"}
        </Button>
      </form>
      {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
    </Wrapper>
  );
}
