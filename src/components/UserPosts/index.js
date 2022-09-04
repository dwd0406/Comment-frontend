import React from "react";
import axios from "axios";
import Post from "../Post";

const UserPosts = () => {
    const [user, setUser] = React.useState();
    const id = localStorage.getItem("userId");
    const sendRequest = async () => {
        const res = await axios
            .get(`http://localhost:5000/api/blog/user/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    React.useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    console.log(user);

    return (
        <div>
            {" "}
            {user &&
                user.blogs &&
                user.blogs.map((blog, index) => (
                    <Post
                        id={blog._id}
                        key={index}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        userName={user.name}
                    />
                ))}
        </div>
    );
};

export default UserPosts;