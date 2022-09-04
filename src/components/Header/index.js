import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../store';
import { useStyles } from '../utils/util';
import axios from 'axios';

const Header = () => {
    const classes = useStyles();
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = React.useState();
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
        <AppBar
            position="sticky"
            sx={{
                background:
                    "rgba(20,20,20)",
            }}
        >
            <Toolbar>
                <Typography className={classes.font} variant="h4">
                    留言板
                </Typography>
                {isLoggedIn && (
                    <Box display="flex" marginLeft={"auto"} marginRight="auto">
                        <Tabs
                            textColor="inherit"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            <Tab
                                className={classes.font}
                                LinkComponent={Link}
                                to="/posts"
                                label="所有留言"
                            />
                            <Tab
                                className={classes.font}
                                LinkComponent={Link}
                                to="/myPosts"
                                label="我的留言"
                            />
                            <Tab
                                className={classes.font}
                                LinkComponent={Link}
                                to="/posts/add"
                                label="新增留言"
                            />
                        </Tabs>
                    </Box>
                )}

                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            {" "}
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="warning"
                            >
                                登入或註冊
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispath(authActions.logout())}
                            LinkComponent={Link}
                            to="/auth"
                            variant="contained"
                            sx={{ margin: 1, borderRadius: 10 }}
                            color="warning"
                        >
                            登出
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;