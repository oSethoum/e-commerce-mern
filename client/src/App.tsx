import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { appStore } from "./stores";

const IndexPage = lazy(() => import("./pages/index-page"));
const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));

function App() {
  const setProfile = appStore((state) => state.setProfile);
  const request = appStore((state) => state.request);
  useEffect(() => {
    (async () => {
      const response = await request("/auth/refresh", { method: "POST" });
      if (response.status == 200) {
        setProfile((await response.json()).data);
      }
    })();
  }, []);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" Component={IndexPage}>
            <Route path="/" element={<div>index</div>} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
