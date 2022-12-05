import React, { FC } from "react";
import './Dash.css'
import DashHeader2 from '../../components/dash/DashHeader2';
import DashItem from '../../components/dash/DashItem';
import PicCard from '../../components/dash/PicCard';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import Sidebar from "../../components/dash/Sidebar";
import { IconPaste } from '@consta/uikit/IconPaste';
import { Layout } from "@consta/uikit/Layout";

import { ReactComponent as Icon1 } from "../../assets/img/dash/icon1.svg";
import { ReactComponent as Icon2 } from "../../assets/img/dash/icon2.svg";
import { ReactComponent as Icon3 } from "../../assets/img/dash/icon3.svg";
import { ReactComponent as Icon4 } from "../../assets/img/dash/icon4.svg";
import { ReactComponent as Icon5 } from "../../assets/img/dash/icon5.svg";
import { ReactComponent as Icon6 } from "../../assets/img/dash/icon6.svg";

import D1 from "../../assets/img/dash/die_success.png";
import D2 from "../../assets/img/dash/die_info.png";
import D3 from "../../assets/img/dash/die_warning.png";
import D4 from "../../assets/img/dash/die_error.png";
import { Link } from "react-router-dom";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from "@consta/uikit/IconEdit";
import { IconSettings } from "@consta/uikit/IconSettings";

import Menu1 from "../../assets/img/dash/Menu-1.png";
import Menu2 from "../../assets/img/dash/Menu-2.png";
import Menu3 from "../../assets/img/dash/Menu-3.png";
import Menu4 from "../../assets/img/dash/Menu-4.png";
import Menu5 from "../../assets/img/dash/Menu-5.png";
import Menu6 from "../../assets/img/dash/Menu-6.png";
import Menu7 from "../../assets/img/dash/Menu-7.png";
import Menu8 from "../../assets/img/dash/Menu-8.png";
import Menu9 from "../../assets/img/dash/Menu-9.png";

import kpi1 from "../../assets/img/dash/kpi1.png";
import kpi2 from "../../assets/img/dash/kpi2.png";
import kpi3 from "../../assets/img/dash/kpi3.png";
import kpi4 from "../../assets/img/dash/kpi4.png";
import kpi5 from "../../assets/img/dash/kpi5.png";

import insite1 from "../../assets/img/dash/insite1.png";
import insite2 from "../../assets/img/dash/insite2.png";
import insite3 from "../../assets/img/dash/insite3.png";

import StatsCard from "../../components/dash/StatsCard";
import s1 from "../../assets/img/dash/todo1.png";
import s2 from "../../assets/img/dash/todo2.png";
import s3 from "../../assets/img/dash/todo3.png";
import s4 from "../../assets/img/dash/todo4.png";
import { StatsCardBlue } from "../../components/dash/StatsCardBlue";
import mi1 from "../../assets/img/dash/free-animated-icon-bill-1.svg";
import mi2 from "../../assets/img/dash/free-animated-icon-certificate-1.svg";
import mi3 from "../../assets/img/dash/free-animated-icon-landing-page-1.svg";
import mi4 from "../../assets/img/dash/free-animated-icon-list-1.svg";
import { Grid, GridItem } from "@consta/uikit/Grid";

const linkAnal = "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755A"
const linkZatr = "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C"


const Dash: FC = () => {
    document.body.classList.add('etpStyle');
    //const [theme, setTheme] = useState<ThemeItem>(themes[0])
    const { dashItems } = useAppSelector(state => state.dashReducer)
    const dispatch = useAppDispatch()

    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };

    const dashImgCards = [{
        id: 0,
        label: "Где просмотреть закупочные процедуры?",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card1.png"
    }, {
        id: 1,
        label: "Товары на инспекционном контроле",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card2.png"
    }, {
        id: 2,
        label: "Производственные процессы в газпромнефти",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card2.png"
    }, {
        id: 3,
        label: "Расчистка охранных зон основной территории",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card2.png"
    }, {
        id: 4,
        label: "Как заполнить правильно отчетность в 2022 году?",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card2.png"
    }, {
        id: 5,
        label: "Новые изменения согласования в ЭТП",
        url: "/etp/rnmc?samp=0050569CDC861EDD968FFC5F6F1A755C",
        pic: "../../assets/img/dash/card2.png"
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
                <div className="DashContainer">
                    <div className="DashToolbar">
                        <h3 className="h3"><span>Здравствуйте</span>, Иван Александрович!</h3>
                        <div className="ToolbarSpacer"></div>
                        <div className="dashDate">
                            Сегодня <span>10 Октября 2022</span>
                        </div>
                    </div>
                    <div className="DashScroller">

                        <Grid cols="2" className="DashMenu"
                            breakpoints={{
                                xs: {
                                    cols: 1,
                                    gap: '2xl',
                                },
                                s: {
                                    cols: 2,
                                    gap: '2xl',
                                },
                                m: {
                                    cols: 3,
                                    gap: 'xl',
                                },
                                l: {
                                    cols: 4,
                                    gap: 'xl',
                                },
                                xl: {
                                    cols: 6,
                                    gap: 'xl',
                                },
                            }}>
                            {dashImgCards.map(({ id, label, url, pic }) => (
                                <GridItem >
                                    <PicCard id={id} key={id} label={label} url={url} pic={pic} />
                                </GridItem>
                            ))}
                        </Grid>

                    </div>

                    <div className="DashToolbar mt2">
                        <Icon1 className="mr1" />
                        <h3 className="h3">
                            Задачи
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        <div className="DashStatuses">
                            <StatsCard
                                status="success"
                                url={linkAnal}
                                value={11}
                                title="Формирование РНМЦ (Анализ рынка)"
                                rate="заявок"
                                unit="требуют рассмотрения"
                                imgSrc={s1}
                            />
                            <StatsCard
                                status="warning"
                                url={linkZatr}
                                value={4}
                                title="Формирование РНМЦ (Затратный метод)"
                                rate="заявки"
                                unit="требуют рассмотрения"
                                imgSrc={s3}
                            />
                            {/* <Link to={linkAnal} className="DashStatuseItem"><img src={D1} /></Link>
                            <Link to={linkAnal} className="DashStatuseItem"><img src={D2} /></Link>
                            <Link to={linkAnal} className="DashStatuseItem"><img src={D3} /></Link>
                            <Link to={linkAnal} className="DashStatuseItem"><img src={D4} /></Link> */}
                        </div>
                    </div>

                    <div className="DashToolbar mt2">
                        <Icon2 className="mr1" />
                        <h3 className="h3">
                            Меню
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        <Grid cols="2" className="DashMenu"
                            breakpoints={{
                                xs: {
                                    cols: 1,
                                    gap: '2xl',
                                },
                                m: {
                                    cols: 2,
                                    gap: 'xl',
                                },
                                l: {
                                    cols: 3,
                                    gap: 'xl',
                                },
                                xl: {
                                    cols: 4,
                                    gap: 'xl',
                                },
                            }}>
                            <GridItem >
                                <StatsCardBlue
                                    status="system"
                                    url={linkAnal}
                                    value={12}
                                    title="Счет-фактуры"
                                    rate="Документ налогового учёта"
                                    //unit="1234"
                                    imgSrc={mi1}
                                />
                            </GridItem>
                            <GridItem >
                                <StatsCardBlue
                                    status="warning"
                                    url={linkAnal}
                                    value={52}
                                    title="Заявки на участие в процедуре"
                                    rate="Планирование участия"
                                    //unit="43"
                                    imgSrc={mi2}
                                />
                            </GridItem>
                            <GridItem >
                                <StatsCardBlue
                                    status="error"
                                    url={linkAnal}
                                    value={31}
                                    title="Предквалификация"
                                    rate="Реестр участников"
                                    //unit="31"
                                    imgSrc={mi3}
                                />
                            </GridItem>
                            <GridItem >
                                <StatsCardBlue
                                    status="success"
                                    url={linkAnal}
                                    value={34}
                                    title="Отборы по НСУ"
                                    rate="Автоматизация оценки"
                                    //unit="42"
                                    imgSrc={mi4}
                                />
                            </GridItem>
                        </Grid>

                        {/* <div className="DashMenu">
                            <Link to={linkAnal} className="DashMenuItem"><img src={Menu6} /></Link>
                            <Link to={linkAnal} className="DashMenuItem"><img src={Menu7} /></Link>
                            <Link to={linkAnal} className="DashMenuItem"><img src={Menu8} /></Link>
                            <Link to={linkAnal} className="DashMenuItem"><img src={Menu9} /></Link>
                        </div> */}
                    </div>

                    <div className="DashToolbar mt2">
                        <Icon3 className="mr1" />
                        <h3 className="h3">
                            Новые объявленные закупки
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        <div className="procItem"><a href="/etp/zak/proc?proc_id=10000042371"><div className="Layout Layout_direction_row mt05 jcsb aic"><div className="Text Text_lineHeight_m Text_size_m Text_view_primary proclink">АО «Газпромнефть-ОНПЗ»</div><div className="Badge Badge_size_xs Badge_view_filled Badge_status_system Badge_form_default">Завершена</div></div><div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05 mt1"><b>№ Процедуры</b> — 01-0017504-300-2020</div><div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05">Расчистка охранных зон основной, вспомогательных территорий и Межцеховых трубопроводов АО «Газпромнефть-ОНПЗ»</div><div className="Layout Layout_direction_row mt05"><div className="Layout Layout_direction_column mr2"><div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Начало приема</div><div className="Layout Layout_direction_row"><div className="Badge Badge_size_m Badge_view_stroked Badge_status_normal Badge_form_default">17.02.2020 | 12:00</div></div></div><div className="Layout Layout_direction_column"><div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Окончание приема</div><div className="Layout Layout_direction_row"><div className="Badge Badge_size_m Badge_view_stroked Badge_status_warning Badge_form_default">03.03.2020 | 12:00</div></div></div></div></a></div>
                        <div className="procItem"><a href="/etp/zak/proc?proc_id=10000042372"><div className="Layout Layout_direction_row mt05 jcsb aic"><div className="Text Text_lineHeight_m Text_size_m Text_view_primary proclink">АО «Газпромнефть МЗСМ»</div><div className="Badge Badge_size_xs Badge_view_filled Badge_status_success Badge_form_default Theme Theme_color_gpnDark">Заявка подана</div></div><div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05 mt1"><b>№ Процедуры</b> — 01-0089872-309-2022</div><div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05">Оказание консультационных услуг по доработке действующей системы энергетического менеджмента на соответствие требованиям меж...</div><div className="Layout Layout_direction_row mt05"><div className="Layout Layout_direction_column mr2"><div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Начало приема</div><div className="Layout Layout_direction_row"><div className="Badge Badge_size_m Badge_view_stroked Badge_status_normal Badge_form_default">01.03.2022 | 12:00</div></div></div><div className="Layout Layout_direction_column"><div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Окончание приема</div><div className="Layout Layout_direction_row"><div className="Badge Badge_size_m Badge_view_stroked Badge_status_warning Badge_form_default">03.03.2020 | 12:00</div></div></div></div></a></div>
                    </div>

                    <div className="DashToolbar">
                        <Icon4 className="mr1" />
                        <h3 className="h3">
                            Основные KPI
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        <Layout>
                            <Link to={linkAnal} className="DashKpiItem"><img src={kpi1} /></Link>
                            <Link to={linkAnal} className="DashKpiItem"><img src={kpi2} /></Link>
                            <Link to={linkAnal} className="DashKpiItem"><img src={kpi3} /></Link>
                            <Layout direction="column">
                                <Link to={linkAnal} className="DashKpiItem"><img src={kpi4} /></Link>
                                <Link to={linkAnal} className="DashKpiItem"><img src={kpi5} style={{ marginTop: '-25px' }} /></Link>
                            </Layout>
                        </Layout>
                    </div>

                    <div className="DashToolbar">
                        <Icon5 className="mr1" />
                        <h3 className="h3">
                            Статистика производства
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        {dashItems.map(({ id }) => (
                            <DashItem id={id} key={id} />
                        ))}
                    </div>

                    <div className="DashToolbar">
                        <Icon6 className="mr1" />
                        <h3 className="h3">
                            Инсайты
                        </h3>
                        <div className="ToolbarSpacer"></div>
                        <div>
                            <Button view="ghost" onlyIcon={true} iconLeft={IconEdit} size="m" className="mr1" />
                            <Button view="ghost" onlyIcon={true} iconLeft={IconSettings} size="m" />
                        </div>
                    </div>
                    <div className="DashScroller">
                        <Link to={linkAnal} className="DashInsiteItem"><img src={insite1} /></Link>
                        <Link to={linkAnal} className="DashInsiteItem"><img src={insite2} /></Link>
                        <Link to={linkAnal} className="DashInsiteItem"><img src={insite3} /></Link>
                    </div>

                </div>

            </main>
        </>
    );
};

export default Dash;

