import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dash from "../pages/Dash";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
// import { privateRoutes } from "../router/router";
// import { publicRoutes } from "../router/router";

const AppRouter = () => {
    const isLogin = false;

    return (
        <Routes>
          <Route path="/" element={isLogin ? <Dash /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />}/> 
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;


{/* <Route path='/welcome' element={<Home/>} /> */ }
{/* <Route  path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} /> */}
// import { Navigate } from 'react-router-dom';
// .
// .
// .
// { component: () => <Navigate to="/404" /> }