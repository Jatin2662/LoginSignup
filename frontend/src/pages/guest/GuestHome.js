

import React from "react";
import { Link, useNavigate } from "react-router-dom";



function GuestHome() {

    const navigate = useNavigate();

    return (
        <main className="guest-home-content">
            <section className="hero">
                <h1>Welcome to Our Blog</h1>
                <p>Your source for the latest updates, stories, and news.</p>
                <button className="btn explore-btn" onClick={()=> navigate('/post')} >Explore Posts</button>
                {/* <button className="btn explore-btn"><Link to="/post">Explore Posts</Link></button> */}
            </section>

            <section className="features">
                <div className="feature-box">
                    <h2>Engaging Content</h2>
                    <p>Stay informed with high-quality posts and articles.</p>
                </div>
                <div className="feature-box">
                    <h2>Community Driven</h2>
                    <p>Join our growing community of readers and writers.</p>
                </div>
                <div className="feature-box">
                    <h2>Easy to Use</h2>
                    <p>Navigate and explore with our clean, user-friendly design.</p>
                </div>
            </section>
        </main>
    );
}

export default GuestHome;