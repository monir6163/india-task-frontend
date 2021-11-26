import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

const User = () => {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .min(2, 'Min length = 2')
            .required('First Name is required Min length = 2'),
        lastName: Yup.string()
            .min(2, 'Min length = 2')
            .required('Last name is required Min length = 2'),
        dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        number: Yup.string()
            .min(10, 'number must be at least 10 characters')
            .required('number is required'),
        address: Yup.string()
            .oneOf([Yup.ref('address'), null], 'address must match')
            .required('address is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    let timerInterval
                    Swal.fire({
                        title: 'User Added SuccessFull!',
                        html: 'Auto close in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                }
            })
        reset();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400 mt-20">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-2/3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="w-full">
                        <div className="">
                            <label htmlFor="name" className="block mb-2 font-bold">Title:</label>
                            <select name="title" {...register('title')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.title ? 'is-invalid' : ''}`}>
                                <option value="">Select</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </select>
                            <div className="invalid-feedback">{errors.title?.message}</div>
                        </div>
                        <div className="">
                            <label htmlFor="f-name" className="block mb-2 font-bold">First Name:</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="">
                            <label htmlFor="l-name" className="block mb-2 font-bold">Last Name:</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="dob" className="block mb-2 font-bold">Date of Birth:</label>
                            <input name="dob" type="date" {...register('dob')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.dob ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.dob?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
                            <input name="email" type="email" {...register('email')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="number" className="block mb-2 font-bold">Contact Number:</label>
                            <input name="number" type="number" {...register('number')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.number ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.number?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="number" className="block mb-2 font-bold">Address:</label>
                            <input name="address" type="text" {...register('address')} className={`w-full border border-gray-400 p-3 rounded-lg outline-none focus:border-blue-600 ${errors.address ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.address?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="w-full rounded-lg font-bold text-black-400 bg-green-500 hover:bg-purple-700 p-5 cursor-pointer block" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default User;