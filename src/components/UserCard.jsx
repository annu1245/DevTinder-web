import React from "react";

const UserCard = ({user}) => {
  const {firstName, lastName, skills, about, age, gender, photoUrl} = user;
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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
