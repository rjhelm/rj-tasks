import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/HomePage";
import Signup from "./Pages/Auth/Signup";
import Navbar from "./Components/Navbar/Navbar";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthContext>
      {({ user }) => {
        return (
          <BrowserRouter>
            {user ? <Navbar /> : null}
            <main>
              <Container>
                <Routes>
                  <Route path="/" element={<HomePage />} exact />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </Container>
            </main>
          </BrowserRouter>
        );
      }}
    </AuthContext>
  );
}

export default App;

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(params) => (
//       <AuthContext>
//         {({ user }) => (user ? <Component {...params} /> : <Redirect to="/login" />)}
//       </AuthContext>
//     )}
//   />
// );