import { TextField, Box, Button } from "@mui/material";
import { styled } from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
const Wrapper = styled.div`
  color: white;
  background-color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0;
  padding: 0;
  height: auto;
`;
export default function CreateAccount() {
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
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
          id="outlined-basic"
          label="email"
          variant="standard"
          required
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
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
          id="outlined-basic"
          label="password"
          variant="standard"
          required
        ></TextField>
      </Box>
      <Button variant="outlined" sx={{ justifyItems: "right", margin: "8px" }}>
        submit
      </Button>
    </Wrapper>
  );
}
