import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const getConnections = async () => {
        if (connections) return;
        const res = await axios.get(BASE_URL + "user/connections", { withCredentials: true });
        dispatch(addConnections(res?.data?.data));
    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        connections && (
            <>
                <h1 className="text-center my-2 text-2xl">Connections</h1>

                <div className="flex items-center justify-center">
                    <div className="flex flex-col w-2/5">
                        {connections.map((connection) => (
                            <ConnectionCard key={connection._id} data={connection} />
                        ))}
                    </div>
                </div>
            </>
        )
    );
};

export default Connections;
