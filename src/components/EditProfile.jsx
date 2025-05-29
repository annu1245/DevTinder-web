import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { GENDER } from "../utils/constants";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [selectedGender, setSelectedGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl|| "");
    const [error, setError] = useState("");
    const [showToaster, setShowToaster] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender: selectedGender,
                    about,
                    photoUrl,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res?.data?.data));
            setShowToaster(true);
            setTimeout(() => {
                setShowToaster(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setError(error?.response?.data);
        }
    };

    const handleChange = (e) => {
        setSelectedGender(e.target.value);
    };
    return (
        <>
            {showToaster && (
                <div className="toast toast-top toast-center z-10">
                    <div className="alert alert-success">
                        <span>Profile data saved successfully</span>
                    </div>
                </div>
            )}

            <div className="flex justify-center gap-10 my-10">
                <div className="flex justify-center">
                    <div className="card card-border bg-base-300 w-96 ">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Login form</h2>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">FirstName</legend>
                                <input type="text" className="input" placeholder="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">LastName</legend>
                                <input type="text" className="input" placeholder="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">age</legend>
                                <input type="text" className="input" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Browsers</legend>
                                <select value={selectedGender} onChange={handleChange} className="select">
                                    <option value="">-- Select --</option>
                                    {GENDER.map((gen) => (
                                        <option key={gen.value} value={gen.value}>
                                            {gen.label}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <input type="text" className="input" placeholder="about" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">PhotoUrl</legend>
                                <input type="text" className="input" placeholder="photo url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>
                            <p className="text-red-500 font-bold">{error}</p>
                            <div className="card-actions justify-center mt-4">
                                <button className="btn btn-primary" onClick={saveProfile}>
                                    Save profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender: selectedGender, about, photoUrl }} />
            </div>
        </>
    );
};

export default EditProfile;
