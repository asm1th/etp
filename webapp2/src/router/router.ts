import React from "react";
import Dash from "../pages/Dash";
import Login from "../pages/Login";

export interface IRoute {
    path: string,
    element: React.ElementType;
    exact?: boolean;
}


// масссив путей пока не используем

export enum RouteNames {
    LOGIN = '/login',
    DASH = '/'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, exact: true, element: Login}
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.DASH, exact: true, element: Dash}
]