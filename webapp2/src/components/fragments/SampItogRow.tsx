import React, { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../hooks/redux";

const SampItogRow: FC = () => {
    const { stags } = useAppSelector(state => state.sampReducer)

    return (
        <>
            {stags.map(({ kp_stage_guid, opr_usl_stage, opr_usl_stage_num, stagSumm, stagSumm_nds }) => (
                <Layout key={kp_stage_guid} className="EtapsItogRow mb1">
                    <Layout flex={1}>
                        <Text className="weight700">Этап {opr_usl_stage_num}</Text>
                    </Layout>
                    <Layout flex={6}>
                        <Text className="weight700">{opr_usl_stage}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr2" align="center">Сумма без НДС</Text>
                        <Text className="summ" align="center">{parseFloat(stagSumm) || "-- --"}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr2" align="center">Сумма c НДС</Text>
                        <Text className="summ" align="center">{parseFloat(stagSumm_nds) || "-- --"}</Text>
                    </Layout>
                </Layout>
            ))}
        </>
    );
};

export default SampItogRow;