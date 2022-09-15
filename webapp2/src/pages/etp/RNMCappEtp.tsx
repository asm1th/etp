
import React, { FC } from "react";
import DashHeader2 from '../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import RNMCapp from "../rnmc/RNMCapp";
import './RNMCappETP.css';
import Sidebar from "../../components/dash/Sidebar";

const RNMCappEtp: FC = () => {
    document.body.classList.add('etpStyle');
    const dispatch = useAppDispatch()

    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };


    return (
        <>
            <Sidebar
                collapsed={isToggleSidebar}
                toggled={isToggleSidebar}
                handleToggleSidebar={handleToggleSidebar}
            />
            <main>
                <DashHeader2 />
                <div className="RNMCappETP">
                    <RNMCapp />
                </div>
            </main>
        </>
    );
};

export default RNMCappEtp;