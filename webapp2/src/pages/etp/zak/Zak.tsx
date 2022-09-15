import React, { FC, useState } from "react";
import DashHeader2 from '../../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { dashSlice } from "../../../store/reducers/dash/dashSlice";
import Sidebar from "../../../components/dash/Sidebar";
import ZakFilterProc from '../../../components/zak/ZakFilterProc';
import './Zak.css'
import { Text } from '@consta/uikit/Text';
import { Link } from "react-router-dom";
import { Badge } from "@consta/uikit/Badge";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Pagination } from '@consta/uikit/Pagination';
import { Button } from "@consta/uikit/Button";
import { IconHamburger } from "@consta/uikit/IconHamburger";
import { IconBento } from "@consta/uikit/IconBento";


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
                            <div className="procItem">
                                <Link to={'/etp/zak/proc?id='+id}>
                                    <Layout className="mt05 jcsb">
                                        <Text size="m" className="proclink">
                                            {title}
                                        </Text>
                                        <Badge size="xs" status="system" label="Заявка не подана" className="mt05" />
                                    </Layout>
                                    <Text size="s" className="mb05 mt1">
                                        <b>№ Процедуры</b> — {num}
                                    </Text>
                                    <Text size="s" className="mb05">
                                        {desc}
                                    </Text>
                                    <Layout className="mt05">
                                        <Layout direction="column" className="mr2">
                                            <Text size="xs" view="secondary" className="mb05">Начало приема</Text>
                                            <Layout><Badge status="system" view="stroked" label={date_start} /></Layout>
                                        </Layout>
                                        <Layout direction="column">
                                            <Text size="xs" view="secondary" className="mb05">Окончание приема</Text>
                                            <Layout><Badge status="warning" view="stroked" label={date_end} /></Layout>
                                        </Layout>
                                    </Layout>
                                </Link>
                            </div>
                        ) : (
                            <div className="procItem procItemHorizontal">
                                <Link to={'/zak/proc'}>
                                    <Layout className="mt05 aic bb pb1">
                                        <Layout flex={1}>
                                            <Text size="s" className="proclink">
                                                {title}
                                            </Text>
                                        </Layout>
                                        <Layout flex={3}>
                                            <Text size="xs" className="ml2">
                                                <b>№ Процедуры</b> — {num}
                                            </Text>
                                        </Layout>
                                        <Layout flex={3} className="jcfe aic acc">

                                            <Text size="xs" view="secondary" className="mr1">Начало приема</Text>
                                            <Layout><Badge status="system" view="stroked" label={date_start} /></Layout>

                                            <Text size="xs" view="secondary" className="mr1">Окончание приема</Text>
                                            <Layout><Badge status="warning" view="stroked" label={date_end} /></Layout>
                                            <Badge size="xs" status="system" label="Заявка не подана" className="ml2" />

                                        </Layout>
                                    </Layout>

                                    <Text size="s" className="mt1">
                                        {desc}
                                    </Text>

                                </Link>
                            </div>
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

export default Zak;

