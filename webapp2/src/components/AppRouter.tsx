import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import Dash from "../pages/Dash";
import Login from "../pages/Login";
import { ResponsesExit } from '@consta/uikit/ResponsesExit';
import { Responses404 } from '@consta/uikit/Responses404';

// масссив путей пока не используем
// import { privateRoutes } from "../router/router";
// import { publicRoutes } from "../router/router";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    return (
        <Routes>
          <Route path="/" element={isAuth ? <Dash /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />}/> 
          <Route path="/logout" element={<ResponsesExit/>}/> 
          <Route path="*" element={<Responses404 />} />
        </Routes>
    );
};

export default AppRouter;