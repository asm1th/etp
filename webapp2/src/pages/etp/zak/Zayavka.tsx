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
import { ILot, IProc } from "../../../store/reducers/zak/IZak";
import { Timer } from "@consta/uikit/Timer";
import './Proc.css'
import ZayavkaForm from "../../../components/zak/proc/ZayavkaForm";
import { useNavigate } from "react-router-dom";



const Zayavka = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

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

    const { procList, isZakReadyToSend } = useAppSelector(state => state.zakReducer)
    const params = useLocation().search;
    const proc_id = new URLSearchParams(params).get("proc_id") || ''
    const lot_id = new URLSearchParams(params).get("lot_id") || ''
    const procCur = procList[procList.findIndex((proc: IProc) => proc.id === proc_id)]
    const lotCur = procCur.lots[procCur.lots.findIndex((lot: ILot) => lot.id === lot_id)]

    const handleBack = () => {
        navigate('/etp/zak/proc?proc_id=' + proc_id)
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

                <div className="zakContainer">
                    <Breadcrumbs items={pagesNoIcon} size="s" className="mb2" />
                    <Button label="Назад к списку лотов" onClick={handleBack} className="btnBack mt1" iconLeft={IconBackward} view="clear" />
                    <Layout className="mb1 aifs jcsb">
                        <Layout direction="column" className="mr2">
                            <Text size="m" className="Title mb1 mt1">Заявка участника к процедуре {procCur.num}, Лот №{lot_id}</Text>
                            <Layout>
                                <Badge size="s" status={lotCur.status === "Заявка не подана" ? "normal" : lotCur.status === "Завершена" ? "system" : "success" } label={lotCur.status} />
                            </Layout>
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
                                {/* <DatePicker type="date-time" label="Дата и время последнего изменения" value={date1} onChange={({ value }) => setDate1(value)} />;*/}
                                <Layout direction="column" className="mr2">
                                    <Text size="xs" view="secondary" className="mb05">Дата и время изменения</Text>
                                    <Layout>
                                        <Badge status="normal" view="stroked" label={procCur.date_start + ' | ' + procCur.date_start_time} />
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
                                        <Text view="brand" size="xs" className="mt05" transform="uppercase">Часов</Text>
                                    </Layout>
                                    <Layout direction="column" className="aic mt05">
                                        <Timer size="2xl" seconds={5} progress={80} />
                                        <Text view="brand" size="xs" className="mt05" transform="uppercase">Минут</Text>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>

                    <Layout className="mb2 pb2 bt pt2">
                        {lotCur.status==="Заявка подана" ? (
                            <Button label="Отозвать заявку и изменить" className="mr05" iconLeft={IconRevert} onClick={() => handleToggleSidebar(true)} />
                        ) : (
                            <Button label="Подать заявку" disabled={!isZakReadyToSend} 
                            className={`mr05 ${isZakReadyToSend ? 'pulse' : ''}`}
                            view="primary" iconLeft={IconAllDone} onClick={() => handleToggleSidebar(true)} />
                        )}
                        <Button label="Отказаться от участия" view="secondary" disabled={lotCur.status==="Заявка подана" ? false : true} iconLeft={IconCancel} onClick={() => handleToggleSidebar(true)} />
                    </Layout>

                    <ZayavkaForm/>

                </div>
            </main>
        </>
    );
};

export default Zayavka;