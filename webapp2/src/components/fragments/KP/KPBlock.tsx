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
        <>
            {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds }) => (
                <Collapse
                    key={kp_stage_guid}
                    label={`Этап ${opr_usl_stage_num} ${opr_usl_stage}`} 

                    className="EtapsItog"
                    isOpen={isOpen}
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
                            <Text className="label" align="center">* Стоимость ЕИ</Text>
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

                    <KPRow />

                </Collapse>
            ))}
        </>
    );
};

export default KPBlock;