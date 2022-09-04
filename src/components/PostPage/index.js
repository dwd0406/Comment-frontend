import { CardContent, CardHeader, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
    const [blog, setBlog] = React.useState();
    const [inputs, setInputs] = React.useState({});
    const navigate = useNavigate();
    const id = useParams().id;
    // console.log(id);
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

    const handlePage = () => {
        navigate(`/posts`)
    }
    
    console.log(blog);

    return (
        <div>
            {inputs && (
                <form >
                    <Box
                        border={3}
                        backgroundColor="white"
                        borderRadius={10}
                        padding={3}
                        margin={"auto"}
                        marginTop={3}
                        display="flex"
                        flexDirection={"column"}
                        width={"40%"}
                    >
                        <Button
                            color="warning"
                            sx={{
                                marginLeft: "auto"
                            }}
                            onClick={handlePage}
                        >
                            點我返回
                        </Button>
                        <CardContent>
                            <CardHeader
                                title={inputs.title}
                            />
                            <hr />
                            <CardHeader
                            />
                            {inputs.description}
                        </CardContent>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default PostPage;