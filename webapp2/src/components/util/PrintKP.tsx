import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import KPRow from "../fragments/KP/KPRow";
import { useAppSelector } from "../../hooks/redux";
import { format } from "date-fns";
import { numberWithSpaces } from "../../helpers";


const PrintKP: FC = () => {
    const { stags, links, kp_summ, kp_summ_nds, lot_name, waers, kp_accep_date, kp_send_date, usl_period_end, saveDate } = useAppSelector(state => state.sampReducer)
    const travel_exp_nds = 0.2

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
                            Срок действия КП: <span className="bold"> {links.kp_offer_expire_date && format(new Date(links.kp_offer_expire_date), 'dd.MM.yyyy')}</span>
                        </Text>
                        <Text size="s">
                            Валюта {waers}
                        </Text>
                    </Layout>
                </Layout>


                {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds, isNoNds, units }) => (
                    <div key={opr_usl_stage_num+kp_stage_guid}>
                        <Layout className="kpHeader">
                            <Text>
                                Этап {opr_usl_stage_num} {opr_usl_stage}
                            </Text>
                        </Layout>
                        <Layout className="tableHeader">
                            <Layout flex={3} className="tar">
                                <Text className="label">
                                    Наименование расценки
                                </Text>
                            </Layout>
                            <Layout flex={1} className="tar">
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
                            <Layout flex={1} className="ml1">
                                <Text className="label" align="center">Сумма без НДС</Text>
                            </Layout>
                            <Layout flex={1} className="ml1">
                                <Text className="label" align="center">Сумма с НДС</Text>
                            </Layout>
                        </Layout>
                        <div className="table">

                            <KPRow etapId={opr_usl_stage_num} />

                            <Layout className="ifooter row">
                                <Layout flex={7} className="tar">
                                    {isNoNds ? (
                                        <div className="noNDSrow noNDSrowAll">
                                            Стоимость предложения не облагается НДС, в соответствии со статьей {units[0].usrps[0].nds_comm} НК РФ
                                        </div>
                                    ) : null}
                                </Layout>

                                <Layout flex={1} className="cell jcc">
                                    <Text align="center">Итого</Text>
                                </Layout>
                                <Layout flex={1} className="cell jcc ml1">
                                    <Text align="center">{stagSumm}</Text>
                                </Layout>
                                <Layout flex={1} className="cell jcc ml1">
                                    <Text align="center">{stagSumm_nds}</Text>
                                </Layout>
                            </Layout>
                        </div>
                    </div>
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
                            {numberWithSpaces( (links.travel_exp ? parseFloat(links.travel_exp) : 0 ).toString() )}
                        </Text>
                    </Layout>
                    <Layout flex={1} className="cell jcc">
                        <Text align="center">
                            {numberWithSpaces( (links.travel_exp ? parseFloat(links.travel_exp) + parseFloat(links.travel_exp)*travel_exp_nds : 0).toString() )}
                        </Text>
                    </Layout>
                </Layout>
                <Layout className="kpFooter">
                    <Layout flex={3} className="allItog">
                        <Text size="m">
                            Итоговая стоимость закупки
                        </Text>
                    </Layout>
                    <Layout flex={2} className="cell aic jcc">
                        <Text size="m" className="label mr1">
                            Сумма<br/>без НДС
                        </Text>
                        <Text >
                            {kp_summ}
                        </Text>
                    </Layout>
                    <Layout flex={2} className="cell aic jcc">
                        <Text size="m" className="label mr1">
                            Сумма<br/>с НДС
                        </Text>
                        <Text>
                            {kp_summ_nds}
                        </Text>
                    </Layout>
                </Layout>

                <Layout className="podpisi mt3">
                    <Layout flex={2} className="aic bt1" direction="column">
                        <Text size="xs" fontStyle="italic" className="label">Должность подписанта (полностью)</Text>
                    </Layout>
                    <Layout flex={1} className="aic bt1 mr2 ml2" direction="column">
                        <Text size="xs" fontStyle="italic" className="label">Подпись</Text>
                    </Layout>
                    <Layout flex={1} className="aic bt1" direction="column">
                        <Text size="xs" fontStyle="italic" className="label">Расшифровка подписи</Text>
                    </Layout>
                </Layout>
                <Layout className="podpisi mt3">
                    <Layout flex={2}>
                        <Text size="xs" fontStyle="italic" className="label">КП сформировано {format(new Date(), 'dd.MM.yyyy')}</Text>
                    </Layout>
                    <Layout flex={2} className="aic bt1 jcc">
                        <Text size="xs" fontStyle="italic" className="label">МП</Text>
                    </Layout>
                </Layout>
            </div>


        </>
    );
};

export default PrintKP;