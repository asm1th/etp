import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import RNMCapp from "../pages/rnmc/RNMCapp";
import RNMCappEtp from "../pages/etp/RNMCapp";
import Login from "../pages/Login";
import LoginCode from "../pages/LoginCode";
import Logout from "../pages/Logout";
import { Responses404 } from '@consta/uikit/Responses404';
import KPpage from "../pages/rnmc/KPpage";

//etp
import EtpLoginCode from "../pages/etp/LoginCode";
import EtpLogin from "../pages/etp/Login";
import Registration from "../pages/etp/Registration";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const isCodeLink = false // check url то show code window

    return (
        <Routes>
          <Route path="/" element={isAuth ? <RNMCapp /> : <Navigate to="/login" />} />
          <Route path="/kp" element={isAuth ? <KPpage /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />}/> 
          <Route path="/code" element={isCodeLink ? <Navigate to="/" /> : <LoginCode />}/> 
          <Route path="/logout" element={<Logout/>}/> 
          <Route path="*" element={<Responses404 />} />
          <Route path="/etp" element={isAuth ? <RNMCappEtp /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/login" element={<EtpLogin />} />
          <Route path="/etp/logincode" element={<EtpLoginCode />} />
          <Route path="/etp/reg" element={<Registration />} />
        </Routes>
    );
};

export default AppRouter;