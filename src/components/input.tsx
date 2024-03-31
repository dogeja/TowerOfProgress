import { Button, Stack } from "@mui/material";

export default function Input() {
  return (
    <Stack spacing={2} direction={"row"}>
      <Button>TEXT</Button>
      <Button variant="contained">TEXT2</Button>
      <Button>TEXT3</Button>
    </Stack>
  );
}
