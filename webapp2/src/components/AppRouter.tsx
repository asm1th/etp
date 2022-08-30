import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import Dash from "../pages/rnmc/RNMCapp";
import Login from "../pages/Login";
import LoginCode from "../pages/LoginCode";
import { ResponsesExit } from '@consta/uikit/ResponsesExit';
import { Responses404 } from '@consta/uikit/Responses404';

//etp
import EtpLoginCode from "../pages/etp/LoginCode";
import EtpLogin from "../pages/etp/Login";
import Registration from "../pages/etp/Registration";

// масссив путей пока не используем
// import { privateRoutes } from "../router/router";
// import { publicRoutes } from "../router/router";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const isCodeLink = false // check url то show code window
    return (
        <Routes>
          <Route path="/" element={isAuth ? <Dash /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />}/> 
          <Route path="/code" element={isCodeLink ? <Navigate to="/" /> : <LoginCode />}/> 
          <Route path="/logout" element={<ResponsesExit/>}/> 
          <Route path="*" element={<Responses404 />} />

          <Route path="/etp" element={isAuth ? <Dash /> : <Navigate to="/etp/login" />} />
          <Route path="/etp/login" element={<EtpLogin />} />
          <Route path="/etp/logincode" element={<EtpLoginCode />} />
          <Route path="/etp/reg" element={<Registration />} />
        </Routes>
    );
};

export default AppRouter;