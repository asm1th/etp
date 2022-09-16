import React, { FC, useState } from "react";
import DashHeader2 from '../../../components/dash/DashHeader2';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { dashSlice } from "../../../store/reducers/dash/dashSlice";
import Sidebar from "../../../components/dash/Sidebar";
import { Breadcrumbs } from '@consta/uikit/BreadcrumbsCanary';
import './Proc.css'
import { Text } from '@consta/uikit/Text';
import { useLocation } from "react-router-dom";
import { Badge } from "@consta/uikit/Badge";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Button } from "@consta/uikit/Button";
import { IconBackward } from "@consta/uikit/IconBackward";
import { IconForward } from "@consta/uikit/IconForward";
import { IconArrowUp } from "@consta/uikit/IconArrowUp";
import { IconArrowDown } from "@consta/uikit/IconArrowDown";
import { Card } from "@consta/uikit/Card";
import { Checkbox } from '@consta/uikit/Checkbox';



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

    const { procList } = useAppSelector(state => state.zakReducer)
    const params = useLocation().search;
    const proc_id = new URLSearchParams(params).get("id") || ''
    const procListCur = procList[procList.findIndex((proc: any) => proc.id === proc_id)]

    const [collapsed, setCollapsed] = useState(true)

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
                    <Breadcrumbs items={pagesNoIcon} size="s" className="mb2" />
                    <Button label="Назад к списку процедур" className="btnBack mt1" iconLeft={IconBackward} view="clear" />
                    <Text size="m" className="Title mb1 mt1">{procListCur.title}</Text>
                    <Text size="s" view="secondary" className="mt1">Полное наименование процедуры:</Text>
                    <Text size="m" className="mb2 mt05">{procListCur.desc}</Text>
                    <Layout className="tableHeader mb1 mt1 pb1 jcsb">
                        <Text size="m" className="Title">Лоты процедуры</Text>
                    </Layout>

                    <Card horizontalSpace="2xl" verticalSpace="2xl">
                        <Layout className="jcsb aic">
                            <Text size="l" className="colorBlue">{procListCur.desc}</Text>
                            <Layout>
                                <Button label="Задать вопрос" className="mr05" view="secondary" />
                                <Button label="Подать заявку" className="mr05" iconRight={IconForward} view="primary" />
                            </Layout>
                        </Layout>

                        <Layout className="bb pb1 mb1" direction="column">
                            <Layout direction={collapsed ? "column" : "row"}>
                                <Layout className="mt1 mr2">
                                    <Badge status="system" label={procListCur.status} />
                                </Layout>
                                <Layout className="mt1 mr2">
                                    <Text size="s" view="secondary" className="mr05">Номер лота:</Text>
                                    <Text size="s">1</Text>
                                </Layout>
                                <Layout className="mt1 mr2">
                                    <Text size="s" view="secondary" className="mr05">ID лота:</Text>
                                    <Text size="s">10000042873</Text>
                                </Layout>
                            </Layout>
                            <Layout className="mt1">
                                <Text size="s" view="secondary" className="mr05">Предмет лота:</Text>
                                <Text size="s">Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»</Text>
                            </Layout>
                            {collapsed ? (
                                <Layout className="lotHeaderSubinfo">
                                    <Layout direction="column" className="mr3">
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Стоимость без НДС:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Дата подачи:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Общая стоимость по лоту:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                    </Layout>
                                    <Layout direction="column" className="mr3">
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Сумма НДС:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Время подачи:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                    </Layout>
                                    <Layout direction="column" className="mr2">
                                        <Layout className="mt1">
                                            <Text size="s" view="secondary" className="mr05">Валюта:</Text>
                                            <Text size="s">—</Text>
                                        </Layout>
                                        <Layout className="mt1">
                                            <Checkbox label="Лот закрыт" className="checkbox_s" checked={false} />
                                        </Layout>
                                    </Layout>
                                </Layout>
                            ) : null}
                        </Layout>
                        <Layout className="mt05 jcsb">
                            <Layout>
                                <Layout direction="column" className="mr2">
                                    <Text size="xs" view="secondary" className="mb05">Начало приема</Text>
                                    <Layout><Badge status="system" view="stroked" label={procListCur.date_start} /></Layout>
                                </Layout>
                                <Layout direction="column">
                                    <Text size="xs" view="secondary" className="mb05">Окончание приема</Text>
                                    <Layout><Badge status="warning" view="stroked" label={procListCur.date_end} /></Layout>
                                </Layout>
                            </Layout>
                            <Button label={collapsed ? "Свернуть" : "Развернуть"} view="ghost" className="mr05" onClick={() => setCollapsed(!collapsed)} iconRight={collapsed ? IconArrowUp : IconArrowDown} />
                        </Layout>
                    </Card>

                    <Layout className="tableHeader mb2 mt1 pb1 bb jcsb">
                        <Text size="m" className="Title">Документация организатора к процедуре</Text>
                    </Layout>
                    
                </div>

            </main>
        </>
    );
};

export default Proc;

