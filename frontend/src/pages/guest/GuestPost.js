



import axios from "axios";
import React, { useEffect, useState } from "react";


function GuestPost() {

    const [posts, setPosts] = useState([]);

    const getData = async () => {
        try {

            const url = 'http://localhost:8080/post';

            const response = await axios.get(url);

            console.log(response.data.posts)
            setPosts(response.data.posts)
        } catch (err) {
            setPosts("No Data")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {posts.length === 0 ? (
                <h1>No Data or Check Internet</h1>
            ) : (
                posts.map((post, i) => (
                    <div key={i}>
                        <h3>{post.title}</h3>
                        <div>{post.content}</div>
                        <p>{post.createdAt}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default GuestPost;