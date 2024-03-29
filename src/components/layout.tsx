import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <h2>Hello!</h2>

      <Outlet />
    </>
  );
}
