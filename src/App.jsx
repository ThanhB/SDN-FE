import React, {useEffect} from "react"
import Cookies from "js-cookie";
import { Router } from "../src/routes/section";
import useAuth from "../src/hooks/useAuthen";
function App() {
  const { fetchUserInfo, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [Cookies.get("__token")]);

  return (
    <>
      <Router />

    </>
  )
}

export default App
