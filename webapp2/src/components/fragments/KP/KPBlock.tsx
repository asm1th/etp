import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Collapse } from '@consta/uikit/Collapse';
import { Layout } from "@consta/uikit/Layout";
import KPRow from "./KPRow";
import { useAppSelector } from "../../../hooks/redux";
import SampFooterButtons from "../../../components/fragments/SampFooterButtons";


const KPBlock: FC = () => {
    const { stags, links, kp_summ, kp_summ_nds } = useAppSelector(state => state.sampReducer)

    type IOpen = {
        num: number
        isOpen: boolean
    }
    let aOpeninit: IOpen[] = []
    stags.forEach(stag => {
        aOpeninit.push({
            num: stag.opr_usl_stage_num,
            isOpen: false
        })
    });

    const [aOpen, setOpen] = useState<IOpen[]>(aOpeninit)

    const handleCollapse = (opr_usl_stage_num: number) => {
        let newArr = [...aOpen];
        let curCollapse = newArr[newArr.findIndex((List: any) => List.num === opr_usl_stage_num)]
        curCollapse.isOpen = !curCollapse.isOpen
        setOpen(newArr)
    }

    return (
        <>
            <div className="KPItog">
                {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds, isNoNds }) => (
                    <Collapse
                        key={kp_stage_guid}
                        label={`Этап ${opr_usl_stage_num} \u00A0\u00A0\u00A0  ${opr_usl_stage}`}
                        className="KPItogCollpase"
                        isOpen={aOpen[aOpen.findIndex((List: any) => List.num === opr_usl_stage_num)].isOpen}
                        hoverEffect
                        iconPosition="right"
                        onClick={() => handleCollapse(opr_usl_stage_num)}>
                        <Layout className="tableHeader">
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
                    </Collapse>
                ))}

                <Layout className="TravelRow mt1">
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
            </div>
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
            <SampFooterButtons />
        </>
    );
};

export default KPBlock;