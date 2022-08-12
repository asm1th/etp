import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import Dash from "../pages/Dash";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// масссив путей пока не используем
// import { privateRoutes } from "../router/router";
// import { publicRoutes } from "../router/router";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    return (
        <Routes>
          <Route path="/" element={isAuth ? <Dash /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />}/> 
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;