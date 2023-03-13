import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SigninPage from "./pages/SigninPage";
import RequireAuth from "./redux/features/RequireAuth.js";
import "../src/styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signin" index element={<SigninPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
