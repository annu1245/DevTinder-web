import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import ConnectionCard from "./ConnectionCard";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const getRequests = async () => {
        if (requests) return;
        const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });
        dispatch(addRequests(res?.data?.data));
    };

    useEffect(() => {
        getRequests();
    }, []);

    const handleRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        } catch (error) {
            console.log(error);
        }
    };

    if (!requests) return;

    if (requests.length == 0) return <h1  className="text-2xl my-2 text-center">No request Found</h1>;
    return (
        <>
            <h1 className="text-2xl my-2 text-center">Requests</h1>
            <div className="flex justify-center">
                {requests.map((request) => {
                    const { firstName, lastName, about, photoUrl } = request.fromUserId;
                    return (
                        <div key={request._id} className="w-2/5 bg-base-300 rounded-lg flex  p-4 m-2 justify-between">
                            <div className="flex gap-6">
                                <img className="h-10 w-10 rounded-full" src={photoUrl} alt="photo" />
                                <div>
                                    <p>{firstName + " " + lastName}</p>
                                    <p>{about}</p>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2" onClick={() => handleRequest("rejected", request._id)}>
                                    Reject
                                </button>
                                <button className="btn btn-secondary mx-2" onClick={() => handleRequest("accepted", request._id)}>
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Requests;
