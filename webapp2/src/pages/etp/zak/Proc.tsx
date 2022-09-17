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
import { Attachment } from '@consta/uikit/Attachment';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { IconDownload } from '@consta/uikit/IconDownload';
import { Modal } from '@consta/uikit/Modal';
import { IconClose } from '@consta/uikit/IconClose';
import { TextField } from "@consta/uikit/TextField";
import { FileField, FileFieldProps } from '@consta/uikit/FileField';


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
    const [isModalOpen1, setIsModalOpen1] = useState(false);

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
                    <Layout className="tableHeader mb1 mt1 jcsb">
                        <Text size="m" className="Title">Лоты процедуры</Text>
                    </Layout>


                    {procListCur.lots.map(({ id, title, descr, status, num, price, price_nds, full_price, waers, closed, start_date, start_time, files }) => (
                        <>
                            <Card horizontalSpace="2xl" verticalSpace="2xl">
                                <Layout className="jcsb aic">
                                    <Text size="l" className="colorBlue">{title}</Text>
                                    <Layout>
                                        <Button label="Задать вопрос" className="mr05" view="secondary" onClick={() => setIsModalOpen1(true)} />
                                        <Button label="Подать заявку" className="mr05" iconRight={IconForward} view="primary" />
                                    </Layout>
                                </Layout>

                                <Layout className="bb pb1 mb1" direction="column">
                                    <Layout direction={collapsed ? "column" : "row"}>
                                        <Layout className="mt1 mr2">
                                            <Badge status={status === "ЗАЯВКА НЕ ПОДАНА" ? "system" : "success"} label={status} />
                                        </Layout>
                                        <Layout className="mt1 mr2">
                                            <Text size="s" view="secondary" className="mr05">Номер лота:</Text>
                                            <Text size="s">{num}</Text>
                                        </Layout>
                                        <Layout className="mt1 mr2">
                                            <Text size="s" view="secondary" className="mr05">ID лота:</Text>
                                            <Text size="s">{id}</Text>
                                        </Layout>
                                    </Layout>
                                    <Layout className="mt1">
                                        <Text size="s" view="secondary" className="mr05">Предмет лота:</Text>
                                        <Text size="s">{descr}</Text>
                                    </Layout>
                                    {collapsed ? (
                                        <Layout className="lotHeaderSubinfo">
                                            <Layout direction="column" className="mr3">
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Стоимость без НДС:</Text>
                                                    <Text size="s">{price_nds || '—'}</Text>
                                                </Layout>
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Дата подачи:</Text>
                                                    <Text size="s">{start_date || '—'}</Text>
                                                </Layout>
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Общая стоимость по лоту:</Text>
                                                    <Text size="s">{full_price || '—'}</Text>
                                                </Layout>
                                            </Layout>
                                            <Layout direction="column" className="mr3">
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Сумма НДС:</Text>
                                                    <Text size="s">{price || '—'}</Text>
                                                </Layout>
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Время подачи:</Text>
                                                    <Text size="s">{start_time || '—'}</Text>
                                                </Layout>
                                            </Layout>
                                            <Layout direction="column" className="mr2">
                                                <Layout className="mt1">
                                                    <Text size="s" view="secondary" className="mr05">Валюта:</Text>
                                                    <Text size="s">{waers || '—'}</Text>
                                                </Layout>
                                                <Layout className="mt1">
                                                    <Checkbox label="Лот закрыт" className="checkbox_s" checked={closed} />
                                                </Layout>
                                            </Layout>
                                        </Layout>
                                    ) : null}
                                </Layout>
                                <Layout className="mt05 jcsb">
                                    <Layout>
                                        <Layout direction="column" className="mr2">
                                            <Text size="xs" view="secondary" className="mb05">Начало приема</Text>
                                            <Layout><Badge status="system" view="stroked" label={procListCur.date_start + " | " + procListCur.date_start_time} /></Layout>
                                        </Layout>
                                        <Layout direction="column">
                                            <Text size="xs" view="secondary" className="mb05">Окончание приема</Text>
                                            <Layout><Badge status="warning" view="stroked" label={procListCur.date_end + " | " + procListCur.date_end_time} /></Layout>
                                        </Layout>
                                    </Layout>
                                    <Button label={collapsed ? "Свернуть" : "Развернуть"} view="ghost" className="mr05" size="s" onClick={() => setCollapsed(!collapsed)} iconRight={collapsed ? IconArrowUp : IconArrowDown} />
                                </Layout>
                            </Card>

                            <Layout className="tableHeader mb1 mt2 pb1 bb jcsb">
                                <Text size="m" className="Title">Документация организатора к процедуре</Text>
                            </Layout>

                            <Layout className="mb3">
                                <Grid gap="xs" cols="4" xAlign="center" yAlign="center">
                                    {files.map(({ fileName, fileExtension, fileDescription }) => (
                                        <GridItem>
                                            <Attachment
                                                fileName={fileName}
                                                fileExtension={fileExtension}
                                                fileDescription={fileDescription}
                                                buttonIcon={IconDownload}
                                                //   buttonIcon={IconTrash}
                                                //   buttonTitle="Удалить"
                                                onClick={() => console.log('onClick')}
                                                onButtonClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('onButtonClick');
                                                }}
                                            />
                                        </GridItem>
                                    ))}
                                </Grid>
                            </Layout>

                            <Modal
                                isOpen={isModalOpen1}
                                hasOverlay
                                //onClickOutside={() => setIsModalOpen1(false)}
                                onEsc={() => setIsModalOpen1(false)}
                                style={{ maxWidth: "500px" }}
                            >
                                <Layout className="jcb">
                                    <Text as="p" size="s" view="secondary" className="ModalTitle">
                                        Вопрос / ответ
                                    </Text>
                                    <Button
                                        size="l"
                                        view="clear"
                                        iconLeft={IconClose}
                                        onClick={() => setIsModalOpen1(false)}
                                    />
                                </Layout>
                                <div className="ModalContent">
                                    <TextField
                                        placeholder="Выберите тему"
                                        label="Тема"
                                        size="s"
                                        width="full" />
                                    <TextField
                                        placeholder="Текст вопроса по процедуре"
                                        label="Вопрос"
                                        size="s"
                                        width="full"
                                        type="textarea"
                                        rows={7}
                                        cols={50}
                                        className="mt1" />
                                    <TextField
                                        placeholder="ФИО"
                                        label="ФИО"
                                        size="s"
                                        width="full"
                                        className="mt3"
                                    />
                                    <TextField
                                        placeholder="Телефон"
                                        label="Телефон"
                                        size="s"
                                        width="full"
                                        className="mt1"
                                    />
                                    <TextField
                                        placeholder="Email"
                                        label="Email"
                                        size="s"
                                        width="full"
                                        className="mt1"
                                    />
                                    <FileField id="FileFieldWithIcon" className="mt2">{(props) => <Button {...props} size="s" label="Приложить файлы" />}</FileField>
                                </div>
                                <div className="ModalFooter">
                                    <Button
                                        size="s"
                                        view="secondary"
                                        label="Закрыть"
                                        onClick={() => setIsModalOpen1(false)}
                                    />
                                    <Button
                                        size="s"
                                        view="primary"
                                        label="Задать вопрос"
                                        className="ml1"
                                    //onClick={}
                                    />
                                </div>
                            </Modal>
                        </>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Proc;

