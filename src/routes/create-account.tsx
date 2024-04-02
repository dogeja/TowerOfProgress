import { TextField, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
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
export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
            autoFocus
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
            autoFocus
          ></TextField>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          sx={{ justifyItems: "right", margin: "8px", cursor: "pointer" }}
          value={isLoading ? "loading..." : "create account!"}
        >
          create account!
        </Button>
      </form>
    </Wrapper>
  );
}
