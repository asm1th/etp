import React, { FC, useState } from "react";
import DashHeader2 from '../../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { dashSlice } from "../../../store/reducers/dash/dashSlice";
import Sidebar from "../../../components/dash/Sidebar";
import ZakFilterProc from '../../../components/zak/ZakFilterProc';
import './ZakMainPage.css'
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/Layout";
import { Pagination } from '@consta/uikit/Pagination';
import { Button } from "@consta/uikit/Button";
import { IconHamburger } from "@consta/uikit/IconHamburger";
import { IconBento } from "@consta/uikit/IconBento";
import  ProcItem  from "../../../components/zak/ProcItem";
import  ProcItemHor  from "../../../components/zak/ProcItemHor";


const ZakMainPage: FC = () => {
    const dispatch = useAppDispatch()

    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };
    //Закупочные процедуры

    const pagesNoIcon = [{
        label: 'Главная',
        href: '/etp',
    }, {
        label: 'Закупочные процедуры',
        href: '/etp/zak',
    }]

  
    const { procList } = useAppSelector(state => state.zakReducer)

    const [currentPage, setCurrentPage] = useState<number>(0);
    const totalPages = 10;
    const handleChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const [listStyle, setListStyle] = useState<boolean>(true);

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
                    <Layout className="tableHeader mb2 mt1 pb1 bb jcsb">
                        <Text size="m" className="Title">Перечень процедур</Text>
                        <Layout>
                            <Button view={listStyle ? 'primary' : 'secondary'} iconRight={IconBento} onlyIcon size="s" onClick={() => setListStyle(true)} className="mr05" />
                            <Button view={listStyle ? 'secondary' : 'primary'} iconRight={IconHamburger} onlyIcon size="s" onClick={() => setListStyle(false)}/>
                        </Layout>
                    </Layout>
                    {procList.map(({ id, title, num, desc, date_start, date_end }) => (
                        listStyle ? (
                            <ProcItem key={id} proc_id={id}/>
                        ) : (
                            <ProcItemHor key={id} proc_id={id}/>
                        )
                    ))}

                    <Pagination
                        className="mt2"
                        currentPage={currentPage}
                        onChange={handleChange}
                        totalPages={totalPages}
                        type="input"
                        size="s"
                        position="right"
                    />
                </div>

            </main>
        </>
    );
};

export default ZakMainPage;

