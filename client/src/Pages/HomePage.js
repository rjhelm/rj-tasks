import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import NavTabs from '../Components/MUI/NavTabs';
import { AuthContext } from "../context/AuthContext";

export default class HomePage extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ redirect: true });
        }, 2000);
    }
    render() {
        return (
            <AuthContext>
                {({ user }) => {
                    if (!user) {
                        if (this.state.redirect) {
                            return <Navigate to="/login" />;
                        }
                    }
                    return (
                        <>
                            <h2 className="text-center">Task Manager App</h2>
                            <NavTabs />
                        </>
                    );
                }}
            </AuthContext>
        );
    }
}
