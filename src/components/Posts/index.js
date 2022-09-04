import React from "react";
import axios from "axios";
import Post from "../Post";

const Posts = () => {
  const [blogs, setBlogs] = React.useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  React.useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  
  return (
    <>
      <div>

        {blogs &&
          blogs.map((blog, index) => (
            <Post
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              userName={blog.user.name}
            />
          ))}

      </div>
    </>
  );
};

export default Posts;