

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/UserHome.css';
import axios from 'axios';

function UserHome() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const url = 'http://localhost:8080/product/myfetch';

        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        const response = await axios.get(url, headers)

        console.log(response)

        const result = response.data;
        setPosts(result.posts)
    }

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))

        getData();

    }, [])

    const handleLogOut = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');

        navigate('/', {replace: true});
    }

    return (
        <section className="user-home">
            <nav className="user-nav">
                <div>Home</div>
                <button onClick={handleLogOut} className="btn">Log Out</button>
            </nav>

            <div className="user-content">
                <h1>Welcome, {loggedInUser}</h1>
                <div className="user-posts">
                    {
                        posts.length === 0 ? (
                            <h1>Nothing</h1>
                        ) : (
                            posts.map((item) => (
                                <div key={item._id}  className="user-post">
                                    <span>{item.title}</span><br />
                                    <span>{item.content}</span><br />
                                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                            ))
                        )
                    }

                </div>
            </div>
            {/* <Link to="/auth">Login</Link> */}
        </section>
    );
}


export default UserHome;