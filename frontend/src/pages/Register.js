

import React, { useState } from "react";
import "../styles/Register.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";


function Register() {

    // const [form, setForm] = useState(true);

    return (
        <section className="register">
            <nav>Website</nav>
            <main className="register-main" >
                <section className="register-intro">Our website provides everything you don't need because we are building a team soon we will be available and provide services to you.</section>
                <section className="signup">
                    {/* {form ? <LogIn setForm={setForm} /> : <SignUp setForm={setForm} />} */}
                    <Outlet />
                </section>
            </main>
        </section>
    );
}

export default Register;