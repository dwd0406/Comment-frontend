import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../utils/util";

const Post = ({ title, description, userName, isUser, id }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/myPosts/${id}`);
    };
    const deleteRequest = async () => {
        const res = await axios
            .delete(`http://localhost:5000/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/posts"));
    };
    const handlePage = () => {
        navigate(`/posts/${id}`)
    }
    return (
        <div>
            {" "}
            <Card
                sx={{
                    borderRadius: "40px",
                    width: "40%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    ":hover": {
                        backgroundColor: "#dc143c",
                    },
                }}
            >
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditOutlineIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>
                )}
                
                <Box display="flex" >
                    <Button
                        color="warning"
                        sx={{
                            marginLeft: "auto"
                        }}
                        onClick={handlePage}
                    >
                        點我進入
                    </Button>
                </Box>
                <CardHeader
                    title={title}
                />
                <CardContent>
                    <hr />
                    建立者{": "}<b>{userName}</b>
                    <br />
                    <Typography
                        className={classes.font}
                        variant="body2"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Post;