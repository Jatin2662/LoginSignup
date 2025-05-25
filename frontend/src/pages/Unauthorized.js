

import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized(){

    const navigate = useNavigate();

    return(
        <section>
            <h1>Unauthorized Access</h1>
            <button className="btn" onClick={()=> navigate(-1)} >Back</button>
        </section>
    );
}

export {Unauthorized};