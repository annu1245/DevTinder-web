import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            if (user) return;
            const res = await axios.get(BASE_URL + "profile", { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (error) {
            if(error.status == 401) {
              navigate("/login")
            }
            console.log(error);
        }
    };
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Body;
