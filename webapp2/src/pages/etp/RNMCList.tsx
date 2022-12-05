
import { FC } from "react";
import DashHeader2 from "../../components/dash/DashHeader2";
import Sidebar from "../../components/dash/Sidebar";
import { StatsCard } from "../../components/dash/StatsCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ISamp } from "../../models/ISamp";
import { useFetchSampsQuery } from "../../services/SampService";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import './RNMCList.css';

const RNMCList: FC = () => {
    document.body.classList.add('etpStyle');
    const dispatch = useAppDispatch()

    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };

    const { data: samps, isLoading, isSuccess } = useFetchSampsQuery("");

    return (
        <>
            <Sidebar
                collapsed={isToggleSidebar}
                toggled={isToggleSidebar}
                handleToggleSidebar={handleToggleSidebar}
            />
            <main>
                <DashHeader2 />
                <div className="RNMCappETP mt2 ml2">
                    {isSuccess ?
                        samps.map((samp) => (
                            <div className="procItem">
                                <a href= {`/etp/rnmc?samp=${samp.kp_sample_guid}`}>
                                    <div className="Layout Layout_direction_row mt05 jcsb aic">
                                        <div className="Text Text_lineHeight_m Text_size_m Text_view_primary proclink">{samp.lot_name}</div>
                                        <div className="Badge Badge_size_xs Badge_view_filled Badge_status_system Badge_form_default">{samp.sample_type === "A" ? "Затратный метод" : "Анализ рынка"}</div>
                                    </div>
                                    <div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05 mt1"><b>Формирование РНМЦ</b></div>
                                                                       
                                        <div className="Text Text_lineHeight_m Text_size_s Text_view_primary mb05">
                                            Процедура — 01-0017504-300-2020
                                        </div>
                                    
                                    <div className="Layout Layout_direction_row mt05">
                                        <div className="Layout Layout_direction_column mr2">
                                            <div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Начало приема</div>
                                            <div className="Layout Layout_direction_row">
                                                <div className="Badge Badge_size_m Badge_view_stroked Badge_status_normal Badge_form_default">{samp.usl_period_end}</div>
                                            </div>
                                        </div>
                                        <div className="Layout Layout_direction_column">
                                            <div className="Text Text_lineHeight_m Text_size_xs Text_view_secondary mb05">Окончание приема</div>
                                            <div className="Layout Layout_direction_row">
                                                <div className="Badge Badge_size_m Badge_view_stroked Badge_status_warning Badge_form_default">{samp.kp_accep_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            // <StatsCard
                            //     status="success"
                            //     url="/"
                            //     value={11}
                            //     title="Формирование РНМЦ (Анализ рынка)"
                            //     rate="заявок"
                            //     unit="требуют рассмотрения"
                            //     imgSrc="" />
                        ))
                        : null}
                </div>
            </main>
        </>
    );
};

export default RNMCList;