import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, ToolBar, Typography, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import classes from "./Navbar.module.css";

const NavBar = () => {
    return (
        <AuthContext>
            {({ error, user, logOut}) => {
                return (
                    <header>
                        <AppBar position="static">
                            <ToolBar className={classes.nav}>
                                <div>
                                    <Link to="/" className={classes.logo}>
                                        <Typography variant="h6">Task Manager App</Typography>
                                    </Link>
                                </div>
                                <div>
                                    <span className="mr-5">{user.name}</span>
                                    <Button onClick={logOut} variant="contained" color="secondary">Logout</Button>
                                </div>
                            </ToolBar>
                        </AppBar>
                    </header>
                );
            }}
        </AuthContext>
    );
};

export default NavBar;