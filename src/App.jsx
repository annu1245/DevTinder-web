import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import './App.css';
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="*" element={<h1>hiiiiii</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;