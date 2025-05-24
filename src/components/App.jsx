import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import '../App.css';
import Login from "./Login";
import Profile from "../Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Feed";

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="*" element={<h1>Page not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App;