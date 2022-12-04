import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import RnmcRouterByType from "../pages/rnmcRouterByType";
import RNMCappEtp from "../pages/etp/RNMCappEtp";
import Login from "../pages/Login";
import LoginCode from "../pages/LoginCode";
import Logout from "../pages/Logout";
import { Responses404 } from '@consta/uikit/Responses404';
import KPpage from "../pages/rnmc/KPpage";

//etp
import EtpLoginCode from "../pages/etp/LoginCode";
import EtpLogin from "../pages/etp/Login";
import Registration from "../pages/etp/Registration";
import Dash from "../pages/etp/Dash";
import ZakMainPage from "../pages/etp/zak/ZakMainPage";
import Proc from "../pages/etp/zak/Proc";
import Zayavka from "../pages/etp/zak/Zayavka";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const isCodeLink = false // check url то show code window

    return (
        <Routes>
          <Route path="/" element={isAuth ? <RnmcRouterByType /> : <Navigate to="/login" />} />
          <Route path="/kp" element={isAuth ? <KPpage /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />}/> 
          <Route path="/code" element={isCodeLink ? <Navigate to="/" /> : <LoginCode />}/> 
          <Route path="/logout" element={<Logout/>}/> 
          <Route path="*" element={<Responses404 actions={<></>}/>} />

          <Route path="/etp" element={isAuth ? <Dash /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/rnmc" element={isAuth ? <RNMCappEtp /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/zak" element={isAuth ? <ZakMainPage /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/zak/proc" element={isAuth ? <Proc /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/zak/proc/zayavka" element={isAuth ? <Zayavka /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/login" element={<EtpLogin />} />
          <Route path="/etp/logincode" element={<EtpLoginCode />} />
          <Route path="/etp/reg" element={<Registration />} />
        </Routes>
    );
};

export default AppRouter;