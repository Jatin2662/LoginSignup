


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [serverMessage, setServerMessage] = useState('Enter email for reset link generation.');
    const { token } = useParams();
    const [userEmail, setUserEmail] = useState('');
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = async (e) => {

        try {
            e.preventDefault();
            
            const url = 'http://localhost:8080/auth/forgot-password';
            const response = await axios.post(url, { email });

            const { message, success } = response.data;

            if (success) {
                setEmail('');
            }
            setServerMessage(message);
        } catch (err) {
            console.log("Frontend")
            setServerMessage(err.message);
        }
    }

    const handlePasswordsChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value })
    }

    const handleResetChange = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            setServerMessage("Passwords do not match.");
            return;
        }
        try {
            const url = `http://localhost:8080/auth/forgot-password/${token}`
            const { password, confirmPassword } = passwords;
            const response = await axios.post(url, { password, confirmPassword });

            const { message, success } = response.data;

            setServerMessage(message)

            if (success) {
                navigate('/auth/login', { replace: true })
            }

        } catch (err) {
            setServerMessage(err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        if (!token) return;

        const resetPassword = async () => {
            try {
                const url = `http://localhost:8080/auth/forgot-password/${token}`;

                const response = await axios.get(url);
                const { message, success, userEmail } = response.data;

                setUserEmail(userEmail);
                setServerMessage(message);
            } catch (err) {
                setServerMessage(err.message);
            }
        }

        resetPassword();
    }, [token])

    return (
        <>
            <h1 className="signup-heading"><span>Forgot Password</span> <span onClick={() => navigate("/auth/login", { replace: true })} style={{ cursor: 'pointer', fontSize: '0.8em', color: 'rgb(0, 128, 255)', textDecoration: 'underline' }} >Back to LogIn</span> </h1>
            <div className="signup-errors">{serverMessage}</div>
            {!token ?
                (
                    <form onSubmit={handleChange} >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" >Send reset link</button>
                    </form>
                ) :
                (
                    <>
                        <h2>{userEmail}</h2>
                        <form onSubmit={handleResetChange}>
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={passwords.password}
                                onChange={handlePasswordsChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handlePasswordsChange}
                                required
                            />
                            <button type="submit" >Reset Password</button>
                        </form>
                    </>
                )
            }
        </>
    );
}

export default ForgotPassword;