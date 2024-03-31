import { Outlet } from "react-router-dom";
import Input from "./input";
export default function Layout() {
  return (
    <>
      <h2>Hello!</h2>
      <Input></Input>
      <Outlet />
    </>
  );
}
