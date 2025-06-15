


import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LogIn() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [message, setMessage] = useState('');

    // const handleClick = () => {
    //     setForm(false)
    // }


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = loginData;

        const lowerEmail = loginData.email.toLowerCase();

        const payload = {
            ...loginData,
            email: lowerEmail
        }

        try {
            const url = 'http://localhost:8080/auth/login';
            const response = await axios.post(url, payload);

            const result = response.data;

            const { success, message, jwtToken, name, role, email, error } = result;

            if (success) {
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name)
                localStorage.setItem('role', role)

                setTimeout(() => {
                    navigate('/user', { replace: true });
                }, 1000)
            } else if (!success) {
                setMessage(message);
            } else if (error) {
                const details = error?.details?.[0]?.message || "Something went wrong";
                setMessage(details);
            } else {
                setMessage(message || "Login failed");
            }

            // setMessage(response.data.message)
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Server error";
            setMessage(errorMsg);

        }

        setLoginData({
            email: "",
            password: ""
        })

    }

    return (
        <>
            <div className="signup-heading">
                <h1>New User? </h1>
                <span className="s-h-l"><Link to="/auth/signup">Register here</Link></span>
            </div>

            <div className="signup-errors">
                {message === 'Email nott verified.' ? (<Link to='/auth/verify'>Verify</Link>) : (message)}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email*"
                    name="email"
                    autoFocus
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password*"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    minLength={5}
                    required
                />
                <button type="submit" >Log In</button>
            </form>
        </>
    );
}


export default LogIn;