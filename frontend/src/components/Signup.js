

import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [message, setMessage] = useState('');

    // const handleClick = () => {
    //     setForm(true)
    // }


    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }

    function valid(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!valid(signupData.email)) {
            setMessage('Email is not Valid');
            setSignupData({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
        }
        console.log(valid(signupData.email) ? "Valid email address" : "Invalid email address");

        const { firstName, lastName, email, password } = signupData;

        try {
            const url = 'http://localhost:8080/auth/signup';
            const response = await axios.post(url, signupData)

            const result = response.data;
            const { success, message, error } = result;

            setMessage(message)
            if (success) {
                setTimeout(() => {
                    navigate('/auth/verify');
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                setMessage(details)
            } else if (!success) {
                setMessage(message)
            }else {
                setMessage(message || "SignUp failed");
            }

            // setMessage(response.data.message)
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Server error";
            setMessage(errorMsg);
        }

        setSignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })

    }

    return (
        <>
            <div className="signup-heading">
                <h1>Already have an Account? </h1>
                <span className="s-h-l"><Link to="/auth/login" >Log in</Link></span>
            </div>

            <div className="signup-errors">
                {message}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name*"
                    name="firstName"
                    autoFocus
                    value={signupData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name*"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email*"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password*"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    minLength={5}
                    required
                />
                <button type="submit" >Create your Account</button>
            </form>
        </>
    );
}


export default SignUp;