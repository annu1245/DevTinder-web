import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import '../App.css';
import Login from "./Login";
import Profile from "./Profile";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Feed";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import Connections from "./Connections";
import Requests from "./Requests";

function App() {


  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="connections" element={<Connections/>} />
          <Route path="requests" element={<Requests/>} />
          <Route path="*" element={<h1>Page not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App;