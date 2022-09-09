import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import KPRow from "../fragments/KP/KPRow";
import { useAppSelector } from "../../hooks/redux";
import { format } from "date-fns";


const PrintKP: FC = () => {
    const { stags, links, kp_summ, kp_summ_nds, lot_name, waers, kp_accep_date, kp_send_date, usl_period_end } = useAppSelector(state => state.sampReducer)


    return (
        <>
            <div className="KPItog">
                <Layout className="lotInfo mb1">
                    <Layout flex={2} direction="column" className="mr1">
                        <Text as="div" className="label">
                            Предмет закупки
                        </Text>
                        <Text as="div" className="labeltext">
                            {lot_name}
                        </Text>
                    </Layout>
                    <Layout flex={4}>
                        <Layout flex={2} direction="column" className="mr1">
                            <Text as="div" className="label">
                                Участник анализа рынка
                            </Text>
                            <Text as="div" className="labeltext">
                                {links.info_ka_name}
                            </Text>
                        </Layout>
                        <Layout flex={1} direction="column" className="valBlock mr1">
                            <Text as="div" className="label">
                                Валюта
                            </Text>
                            <Text as="div" className="labeltext">
                                {waers}
                            </Text>
                        </Layout>
                        <Layout flex={1} direction="column" className="mr1">
                            <Text as="div" className="label">
                                Дата запроса КП 
                            </Text>
                            <Text as="div" className="labeltext">
                            {kp_send_date && format(new Date(kp_send_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                        <Layout flex={1} direction="column">
                            <Text as="div" className="label">
                                Срок приема КП
                            </Text>
                            <Text as="div" className="labeltext">
                            {kp_accep_date && format(new Date(kp_accep_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout className="aic mb1 jcsb">
                    <Text className="mr1" size="l">
                        Коммерческое предложение
                    </Text>
                    <Layout className="aic">
                        <Text size="s" className="subTitle mr1">
                            Срок действия договора: <span className="bold"> {usl_period_end && format(new Date(usl_period_end), 'dd.MM.yyyy')}</span>
                        </Text>
                        <Text size="s">
                            Валюта {waers}
                        </Text>
                    </Layout>
                </Layout>


                {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds, isNoNds }) => (
                    <>
                        <Layout className="kpHeader">
                            <Text>
                                Этап {opr_usl_stage_num} {opr_usl_stage}
                            </Text>
                        </Layout>
                        <Layout className="Header">
                            <Layout flex={3} className="tar">
                                <Text className="label">
                                    Наименование расценки
                                </Text>
                            </Layout>
                            <Layout flex={2} className="tar">
                                <Text className="label">
                                    Альтернативное наименование расценки
                                </Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Единица<br />измерения (ЕИ)</Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Количество ЕИ</Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Стоимость ЕИ</Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Ставка НДС</Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Сумма без НДС</Text>
                            </Layout>
                            <Layout flex={1}>
                                <Text className="label" align="center">Сумма с НДС</Text>
                            </Layout>
                        </Layout>
                        <div className="table">

                            <KPRow etapId={opr_usl_stage_num} />

                            <Layout className="ifooter row">
                                <Layout flex={3} className="tar">

                                </Layout>
                                <Layout flex={2} className="tar">

                                </Layout>
                                <Layout flex={1}>

                                </Layout>
                                <Layout flex={1}>

                                </Layout>
                                <Layout flex={1}>

                                </Layout>
                                <Layout flex={1} className="cell jcc">
                                    <Text align="center">Итого</Text>
                                </Layout>
                                <Layout flex={1} className="cell jcc">
                                    <Text align="center">{stagSumm}</Text>
                                </Layout>
                                <Layout flex={1} className="cell jcc">
                                    <Text align="center">{stagSumm_nds}</Text>
                                </Layout>
                            </Layout>
                        </div>
                    </>
                ))}

                <Layout className="TravelRow">
                    <Layout flex={4} className="tar">
                        <Text>
                            Командировочные расходы
                        </Text>
                    </Layout>
                    <Layout flex={4} className="cell jcc">
                        <Text>
                            {links.travel_exp_comm}
                        </Text>
                    </Layout>
                    <Layout flex={1} className="cell jcc">
                        <Text align="center">
                            {links.travel_exp}
                        </Text>
                    </Layout>
                    <Layout flex={1} className="cell jcc">
                        <Text align="center">
                            {links.travel_exp}
                        </Text>
                    </Layout>
                </Layout>
                <Layout className="kpFooter">
                    <Layout flex={4} className="tar">
                        <Text>
                            Итоговая стоимость закупки
                        </Text>
                    </Layout>
                    <Layout flex={2} className="cell aic jcc">
                        <Text className="label mr1">
                            Сумма без НДС
                        </Text>
                        <Text >
                            {kp_summ}
                        </Text>
                    </Layout>
                    <Layout flex={2} className="cell aic jcc">
                        <Text className="label mr1">
                            Сумма с НДС
                        </Text>
                        <Text>
                            {kp_summ_nds}
                        </Text>
                    </Layout>
                </Layout>
            </div>


        </>
    );
};

export default PrintKP;