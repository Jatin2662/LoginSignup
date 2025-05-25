


import React from "react";
import {GuestNavbar, GuestBottomNavbar} from "../../components/GuestNavbar";
import { Outlet } from "react-router-dom";



function GuestPage() {
    return (
        <>
            <GuestNavbar />
            <Outlet />
            <GuestBottomNavbar />
        </>
    );
}

export default GuestPage;