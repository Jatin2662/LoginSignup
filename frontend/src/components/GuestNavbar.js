

import React from "react";
import '../styles/GuestHome.css';
import { Link, useNavigate } from "react-router-dom";

function GuestNavbar() {

    const navigate = useNavigate();

    return (
        <nav className="guest-navbar">
            <span>Logo</span>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/post'>Posts</Link></li>
            </ul>
            <button className="btn guest-btn" onClick={()=> navigate('/auth')}>LogIn/SignUp</button>
        </nav>
    );
}

function GuestBottomNavbar() {

    return (
        <div className="guest-bottom-navbar">
            <nav>
                <span>Logo</span>

                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/post'>Posts</Link></li>
                </ul>

                <ul>
                    <li>Contact Us: </li>
                    <li>help@gmail.com</li>
                    <li>+91 0193010304</li>
                </ul>
            </nav>

            <div className="rights">
                All rights reserverd. 2025
            </div>
        </div>
    );
}

export {
    GuestNavbar,
    GuestBottomNavbar
}
