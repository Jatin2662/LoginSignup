



import React, { useEffect, useState } from "react";
import axios from "axios";


function AdminDashboard(){

    const [message, setMessage] = useState('');

    const getData = async ()=>{

        const url = 'http://localhost:8080/admin/adminDashboard';

        const headers = {
            headers: {
                'Authorization': localStorage.getItem('role')
            }
        }

        const response = await axios.get(url, headers)

        setMessage(response.message)
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <h1>{message}</h1>
    );
}

export default AdminDashboard;