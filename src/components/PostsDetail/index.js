import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const PostsDetail = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = React.useState();
    const id = useParams().id;
    // console.log(id);
    const [inputs, setInputs] = React.useState({});
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const fetchDetails = async () => {
        const res = await axios
            .get(`http://localhost:5000/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    React.useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog);
            setInputs({
                title: data.blog.title,
                description: data.blog.description,
            });
        });
    }, [id]);// eslint-disable-line react-hooks/exhaustive-deps
    const sendRequest = async () => {
        const res = await axios
            .put(`http://localhost:5000/api/blog/update/${id}`, {
                title: inputs.title,
                description: inputs.description,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };
    console.log(blog);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/myPosts/"));
    };

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        border={3}
                        backgroundColor="white"
                        borderRadius={10}
                        padding={3}
                        margin={"auto"}
                        marginTop={3}
                        display="flex"
                        flexDirection={"column"}
                        width={"50%"}
                    >
                        <Typography
                            fontWeight={"bold"}
                            padding={3}
                            color="grey"
                            variant="h2"
                            textAlign={"center"}
                        >
                            修改你的留言
                        </Typography>
                        <InputLabel sx={labelStyles}>標題</InputLabel>
                        <TextField
                            name="title"
                            onChange={handleChange}
                            value={inputs.title}
                            margin="auto"
                            variant="outlined"
                        />
                        <InputLabel sx={labelStyles}>內容</InputLabel>
                        <TextField
                            name="description"
                            onChange={handleChange}
                            value={inputs.description}
                            margin="auto"
                            variant="outlined"
                        />

                        <Button
                            sx={{ mt: 2, borderRadius: 4 }}
                            variant="contained"
                            color="warning"
                            type="submit"
                        >
                            發佈
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default PostsDetail;