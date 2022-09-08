import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Collapse } from '@consta/uikit/Collapse';
import { Layout } from "@consta/uikit/LayoutCanary";
import KPRow from "./KPRow";
import { useAppSelector } from "../../../hooks/redux";

const KPBlock: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const { stags } = useAppSelector(state => state.sampReducer)

    return (
        <div className="KPItog">
            {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds }) => (
                <Collapse
                    key={kp_stage_guid}
                    label={`Этап ${opr_usl_stage_num} \u00A0\u00A0\u00A0  ${opr_usl_stage}`}
                    className="KPItogCollpase"
                    isOpen={isOpen}
                    hoverEffect
                    iconPosition="right"
                    onClick={() => setOpen(!isOpen)}>
                    <Layout className="Header">
                        <Layout flex={3} className="tar">
                            <Text className="label">
                                Наименование расценки
                            </Text>
                        </Layout>
                        <Layout flex={3} className="tar">
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

                        <Layout className="Footer row">
                            <Layout flex={3} className="tar">

                            </Layout>
                            <Layout flex={3} className="tar">

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
                                <Text align="center"></Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center"></Text>
                            </Layout>
                        </Layout>
                    </div>
                </Collapse>
            ))}
        </div>
    );
};

export default KPBlock;