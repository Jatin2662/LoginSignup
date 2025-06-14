


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('Verifying...');
    const navigate = useNavigate();

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
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {message === "No verification token provided. Check your inbox" ?
                (
                    <div>
                        <h2>{message}</h2>
                        <a href='https://mail.google.com/' target='_blank' rel="noreferrer">
                            Open Gmail
                        </a>
                    </div>
                ) : (
                    <h2>{message}</h2>
                )
            }
        </div>
    );
};

export default VerificationPage;
