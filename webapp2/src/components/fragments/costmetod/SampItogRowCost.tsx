import React, { FC } from "react";
import { Layout } from '@consta/uikit/Layout';
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../../hooks/redux";
import { numberWithSpaces } from "../../../helpers";

const SampItogRowCost: FC = () => {
    const { stags } = useAppSelector(state => state.sampReducer)

    return (
        <>
            {stags.map(({ 
                kp_stage_guid, 
                opr_usl_stage, 
                opr_usl_stage_num, 
                cost_stage_price_ei, 
                cost_stage_price, 
                cost_stage_price_nds }) => (
                <Layout key={kp_stage_guid} className="EtapsItogRow mb1">
                    <Layout flex={1}>
                        <Text className="weight700">Этап {opr_usl_stage_num}</Text>
                    </Layout>
                    <Layout flex={6}>
                        <Text className="weight700">{opr_usl_stage}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr1" align="center">Трудоемкость</Text>
                        <Text className="summ mr1" align="center">{parseFloat(cost_stage_price_ei) == 0 ? "-- --" : numberWithSpaces(cost_stage_price_ei)}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr1" align="center">Сумма без НДС</Text>
                        <Text className="summ mr1" align="center">{parseFloat(cost_stage_price) == 0 ? "-- --" : numberWithSpaces(cost_stage_price)}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr1" align="center">Сумма c НДС</Text>
                        <Text className="summ" align="center">{parseFloat(cost_stage_price_nds) == 0 ? "-- --" : numberWithSpaces(cost_stage_price_nds)}</Text>
                    </Layout>
                </Layout>
            ))}
        </>
    );
};

export default SampItogRowCost;