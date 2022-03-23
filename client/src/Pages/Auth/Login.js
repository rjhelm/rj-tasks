import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
// ? ====================== ? //
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErrorMsg from "../../components/MUI/ErrorMsg";


const MadeByDev = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Made by "}
            <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/ryjhelm/">
                Ryan Helm
            </a>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white,
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: "theme.spacing(1)",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    return (
        <AuthContext>
            {({ logIn, error, user }) => {
                const submitHandler = (e) => {
                    e.preventDefault();
                    logIn({ email, password });
                };
                if (user) {
                    return <Redirect to="/" />;
                }
                return (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={submitHandler}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to="/signup" variant="body2">
                                            {"Sign Up Here!"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <MadeByDev />
                        </Box>
                        {error === "Invalid Credentials" ?
                            (
                                <ErrorMsg msg="Invalid Credentials" />
                            ) : (
                                ""
                            )
                        }
                    </Container>
                );
            }}
        </AuthContext>
    );
}
