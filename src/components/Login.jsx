import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.response.data);
        }
    };

    const handleSignUp = async () => {
        try {
            let res = await axios.post(BASE_URL + "signup",{
                firstName,
                lastName,
                emailId,
                password
            },
             { withCredentials: true });
             dispatch(addUser(res?.data?.data));
             navigate('/profile')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login form" : "Signup Form"}</h2>
                    {!isLoginForm && (
                        <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Firstname</legend>
                                <input type="text" className="input" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Lastname</legend>
                                <input type="text" className="input" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </>
                    )}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Id {emailId}</legend>
                        <input type="text" className="input" placeholder="Email Id" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="text" className="input" placeholder="passsword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <p className="text-red-500 font-bold">{error}</p>
                    <div className="card-actions justify-center mt-4">
                        {isLoginForm ? (
                            <button className="btn btn-primary" onClick={handleLogin}>
                                Login
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleSignUp}>
                                Sign Up
                            </button>
                        )}
                    </div>
                    <p className="cursor-pointer my-2 font-bold" onClick={() => setIsLoginForm((val) => !val)}>
                        {isLoginForm ? "New User? Signup" : "Existing user? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
