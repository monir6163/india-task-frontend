import React from 'react';
import Swal from 'sweetalert2';

const SingleUser = (props) => {
    const { _id, title, firstName, lastName, dob, email, number, address } = props.user;
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You Delete This User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://quiet-taiga-51107.herokuapp.com/delete/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Great!",
                                "User Delete SuccessFull!",
                                "success"
                            )
                        }
                    })
            }
        })

    }
    return (
        <div
            className="overflow-hidden group border rounded-xl shadow-lg"
        >
            <div className="my-10 text-center space-y-2">
                <h2 className="font-bold text-xl text-teal-600">Name: {title}{" "}{firstName}{" "}{lastName}</h2>
                <h4 className="font-bold text-gray-600 px-2">Email: {email}</h4>
                <p className="font-bold tracking-wider text-teal-600">Date of Birth: {dob}</p>
                <p className="font-bold tracking-wider text-teal-600">Phone: {number}</p>
                <p className="font-bold tracking-wider text-teal-600">Address: {address}</p>
                <button onClick={() => handleDelete(_id)}
                    className="bg-purple-800 rounded text-white hover:bg-gray-900 py-1 px-3 font-semibold"
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default SingleUser;