import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import { RouterProvider, useNavigate } from "react-router-dom";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
const check = () => {
  console.log(auth.currentUser);
};
setInterval(() => {
  check();
}, 2000);

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout></Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
  { path: "/login", element: <Login></Login> },
  { path: "/create-account", element: <CreateAccount></CreateAccount> },
]);
// css
const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: black;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    // await auth.authStateReady();
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  };
  useEffect(() => {
    init();
  });
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        {isLoading ? (
          <Loading />
        ) : (
          <RouterProvider router={router}></RouterProvider>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
