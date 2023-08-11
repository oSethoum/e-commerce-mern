import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const IndexPage = lazy(() => import("./pages/index-page"));
const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));

function App() {
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
