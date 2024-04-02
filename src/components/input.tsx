import { Button, Stack } from "@mui/material";
import React from "react";

export default function Input() {
  return (
    <Stack spacing={2} direction={"row"}>
      <Button>TEXT</Button>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
        }}
        variant="contained"
      >
        TEXT2
      </Button>
      <Button>TEXT3</Button>
    </Stack>
  );
}
