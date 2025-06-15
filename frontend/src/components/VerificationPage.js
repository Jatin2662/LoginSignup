


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useAsyncValue } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('Verifying...');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleChange = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`http://localhost:8080/auth/verify`, {email});

            const { message, success } = response.data;
            setMessage(message)

            setEmail('')

        } catch (err) {
            // const errorMsg = err.response?.data?.message || "Server error";
            setMessage(err.message);
        }
    }

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setMessage("No verification token provided. Check your inbox");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/auth/verify/${token}`);
                setMessage(response.data.message || "Email verified successfully!");

                setTimeout(() => navigate('/auth/login'), 2000);
            } catch (error) {
                setMessage(error.response?.data?.message || "Invalid or expired verification link.");
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div>

            {!token ?
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>{message}</h2>
                    <a href='https://mail.google.com/' target='_blank' rel="noreferrer">
                        Open Gmail
                    </a>
                    <form onSubmit={handleChange} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type='submit'>Send Verification Link</button>
                    </form>
                </div>
                :
                <h2>{message}</h2>
            }
            {/* {message === "No verification token provided. Check your inbox" ?
                (
                    <div>
                        <h2>{message}</h2>
                        <a href='https://mail.google.com/' target='_blank' rel="noreferrer">
                            Open Gmail
                        </a>
                        <form onSubmit={handleChange} >
                    < input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <button type='submit'>Send Verification Link</button>
                </form>
                    </div>
                ) : (
                    <h2>{message}</h2>
                )
            } */}
        </div>
    );
};

export default VerificationPage;
