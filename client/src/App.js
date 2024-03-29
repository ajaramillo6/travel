import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import About from "./pages/about/About";
import Write from "./pages/write/Write";
import Travel from "./pages/travel/Travel";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {

  const { user } = useContext(Context);

  return (
      <Router>
        <Topbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
  );
}

export default App;
