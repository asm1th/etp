import React, { useState } from "react";
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
import { IconCancel } from "@consta/uikit/IconCancel";
import { IconAllDone } from "@consta/uikit/IconAllDone";
import { IconRevert } from "@consta/uikit/IconRevert";

import { Card } from "@consta/uikit/Card";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Attachment } from '@consta/uikit/Attachment';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { IconDownload } from '@consta/uikit/IconDownload';
import { Modal } from '@consta/uikit/Modal';
import { IconClose } from '@consta/uikit/IconClose';
import { TextField } from "@consta/uikit/TextField";
import { FileField, FileFieldProps } from '@consta/uikit/FileField';
import { ILot, IProc } from "../../../store/reducers/zak/IZak";
import { DatePicker } from "@consta/uikit/DatePickerCanary";
import { Timer } from "@consta/uikit/Timer";
import './Proc.css'
import { Tabs } from '@consta/uikit/Tabs';



const Zayavka = () => {
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
    const proc_id = new URLSearchParams(params).get("proc_id") || ''
    const lot_id = new URLSearchParams(params).get("lot_id") || ''
    const procCur = procList[procList.findIndex((proc: IProc) => proc.id === proc_id)]
    const lotCur = procCur.lots[procCur.lots.findIndex((lot: ILot) => lot.id === lot_id)]

    const [date1, setDate1] = useState<Date | null>(null);

    type Item = {
        name: string;
    };

    const items = [{
        name: 'Контактные данные'
    }, {
        name: 'Информация по критериям'
    }, {
        name: 'Документация по формам'
    }, {
        name: 'Ценовое предложение'
    }];
    const [tab, setTab] = useState<Item>(items[0]);

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
                    <Button label="Назад к списку лотов" className="btnBack mt1" iconLeft={IconBackward} view="clear" />
                    <Layout className="mb1 aifs jcsb">
                        <Layout direction="column" className="mr2">
                            <Text size="m" className="Title mb1 mt1">Заявка участника к процедуре {procCur.num}, Лот №{lot_id}</Text>
                            <Layout><Badge size="s" status="system" label="Заявка не подана" /></Layout>
                            {/* <Layout className="mt1 mr2">
                                <Text size="s" view="secondary" className="mr05">Номер лота:</Text>
                                <Text size="s">{lotCur.num}</Text>
                            </Layout> */}
                            {/* <Layout className="mt1 mr2">
                                <Text size="s" view="secondary" className="mr05">Реестровый № процедуры:</Text>
                                <Text size="s">{lotCur.id}</Text>
                            </Layout> */}
                            <Layout className="mt1 mb1">
                                <Text size="s" view="secondary" className="mr05">Предмет лота:</Text>
                                <Text size="s">{lotCur.title}</Text>
                            </Layout>
                            <Layout className="mt1 mb1">
                                <Layout direction="column" className="mr2">
                                    <Text size="xs" view="secondary" className="mb05">Дата и время изменения</Text>
                                    <Layout>
                                        <Badge status="system" view="stroked" label={procCur.date_start + ' | ' + procCur.date_start_time} />
                                    </Layout>
                                </Layout>
                                <Layout direction="column">
                                    <Text size="xs" view="secondary" className="mb05">Дата и время подачи</Text>
                                    <Layout>
                                        <Badge status="warning" view="stroked" label={procCur.date_end + ' | ' + procCur.date_end_time} />
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout className="likeInformer Informer_status_alert">
                            <Layout direction="column">
                                <Text view="brand" size="m">Срок подачи заявок</Text>
                                <Text view="secondary" size="s">Осталось</Text>
                                <Layout>
                                    <Layout direction="column" className="aic mt05">
                                        <Timer size="2xl" seconds={100} progress={100} />
                                        <Text view="brand" size="xs" className="mt05" transform="uppercase">Дней</Text>
                                    </Layout>
                                    <Layout direction="column" className="aic mt05 ml1 mr1">
                                        <Timer size="2xl" seconds={10} progress={80} />
                                        <Text view="brand" size="xs" className="mt05" transform="uppercase">Минут</Text>
                                    </Layout>
                                    <Layout direction="column" className="aic mt05">
                                        <Timer size="2xl" seconds={5} progress={80} />
                                        <Text view="brand" size="xs" className="mt05" transform="uppercase">Часов</Text>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>

                    <Layout className="mb2 pb2 bb">
                        <Button label="Подать заявку" className="mr05" view="primary" iconLeft={IconAllDone} onClick={() => handleToggleSidebar(true)} />
                        <Button label="Отозвать заявку и изменить" className="mr05" view="secondary" iconLeft={IconRevert} onClick={() => handleToggleSidebar(true)} />
                        <Button label="Отказаться от участия" view="secondary" disabled={true} iconLeft={IconCancel} onClick={() => handleToggleSidebar(true)} />
                    </Layout>


                    <Tabs
                        value={tab}
                        onChange={({ value }) => setTab(value)}
                        items={items}
                        getLabel={(item) => item.name}
                        className="mb1"
                    />
                    <Text size="m" className="mb1">Заполните данные контактного лица</Text>
                    
                    

                    {/* <DatePicker type="date-time" label="Дата и время последнего изменения" value={date1} onChange={({ value }) => setDate1(value)} />;
 */}






                </div>
            </main>
        </>
    );
};

export default Zayavka;