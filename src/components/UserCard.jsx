import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({user}) => {

  const {_id, firstName, lastName, skills, about, age, gender, photoUrl} = user;

  const dispatch = useDispatch();

  const handleSentReuests = async(status, userId) => {
    try {
        await axios.post(BASE_URL + "request/" + status + "/" + userId, {}, {withCredentials:true});
        dispatch(removeFeed(userId))
    } catch (error) {
        console.log(error)
    }
  }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="h-72 w-72 m-10" src={photoUrl} alt="profile photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {(age || gender) && <p>{age}, {gender}</p>}
                <p>{about}</p>
                {skills && <p>Interests : {skills.join(", ")}</p>}
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => handleSentReuests("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSentReuests("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
