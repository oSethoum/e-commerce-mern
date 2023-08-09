import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </Router>
  );
}

export default App;
