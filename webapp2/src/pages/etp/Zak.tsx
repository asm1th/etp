import React, { FC, useState } from "react";
import DashHeader2 from '../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import Sidebar from "../../components/dash/Sidebar";
import ZakFilterProc from '../../components/zak/ZakFilterProc';
import { Breadcrumbs } from '@consta/uikit/BreadcrumbsCanary';
import './Zak.css'

const Zak: FC = () => {
    const dispatch = useAppDispatch()

    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };
    //Закупочные процедуры

    const pagesNoIcon = [{
        label: 'Главная',
        href: '/',
    }, {
        label: 'Закупочные процедуры',
        href: '/etp/zak',
    }]

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
                <div className="zakContainer">
                    
                </div>
            </main>
        </>
    );
};

export default Zak;

