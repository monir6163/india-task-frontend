import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import SingleUser from './SingleUser';

const AllUser = () => {
    const [users, setAllusers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setAllusers(data))
    }, [users])
    return (
        <>
            <Header />
            <div style={{ padding: "3.5rem 2.5rem", marginLeft: "auto", marginRight: "auto", width: "100%" }} className="my-container">
                <div className="text-teal-600 text-4xl text-center mb-10" style={{ padding: "3.5rem 0" }}>
                    All User List
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        users.map(user => <SingleUser
                            key={user._id}
                            user={user}
                        ></SingleUser>)
                    }
                </div>
            </div>
        </>
    );
};

export default AllUser;