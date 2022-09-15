import React, { FC, useState } from "react";
import DashHeader2 from '../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import Sidebar from "../../components/dash/Sidebar";
import ZakFilterProc from '../../components/zak/ZakFilterProc';

const Zak: FC = () => {
    const dispatch = useAppDispatch()

    const {isToggleSidebar} = useAppSelector(state => state.dashReducer)
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
                
                <ZakFilterProc />

                
            </main>
        </>
    );
};

export default Zak;

