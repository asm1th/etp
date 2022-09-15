import React, { FC, useState } from "react";
import DashHeader2 from '../../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { dashSlice } from "../../../store/reducers/dash/dashSlice";
import Sidebar from "../../../components/dash/Sidebar";
import ZakFilterProc from '../../../components/zak/ZakFilterProc';
import { Breadcrumbs } from '@consta/uikit/BreadcrumbsCanary';
import './Proc.css'
import { Text } from '@consta/uikit/Text';
import { Link } from "react-router-dom";
import { Badge } from "@consta/uikit/Badge";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Pagination } from '@consta/uikit/Pagination';
import { Button } from "@consta/uikit/Button";
import { IconHamburger } from "@consta/uikit/IconHamburger";
import { IconBento } from "@consta/uikit/IconBento";



const Proc = () => {
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

    const procList = [{
        title: 'АО «Газпромнефть-ОНПЗ»',
        num: '01-0017504-300-2020',
        desc: 'Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»',
        date_start: '17.02.2020',
        date_end: '03.03.2020',
    }, {
        title: 'АО «Газпромнефть МЗСМ»',
        num: '01-0089872-309-2022',
        desc: 'Оказание консультационных услуг по доработке действующей системы энергетического менеджмента на соответствие требованиям меж...',
        date_start: '01.03.2022',
        date_end: '16.03.2022',
    }, {
        title: 'ПАО «Газпромнефть»',
        num: '01-0082996-204-2021',
        desc: 'Открытый двухэтапный конкурентный отбор в электронной форме на право заключения договора на выполнение работ по услуге 11037...',
        date_start: '11.11.2021',
        date_end: '01.12.2021',
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
               
                <div className="zakContainer">
                    

                    
                </div>

            </main>
        </>
    );
};

export default Proc;

