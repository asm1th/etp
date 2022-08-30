import React, { FC } from "react";
import { Layout } from '@consta/uikit/LayoutCanary';
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../hooks/redux";

const EtapsItogRow: FC = () => {
    
    const { etapsSumms } = useAppSelector(state => state.mainReducer)
    return (
        <>
            {etapsSumms.map(({ id, name, etapSumm, etapSumm_nds }) => (
                <Layout key={id} className="EtapsItogRow mb1">
                    <Layout flex={1}>
                        <Text className="weight700">Этап {id}</Text>
                    </Layout>
                    <Layout flex={6}>
                        <Text className="weight700">{name}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr2" align="center">Сумма без НДС</Text>
                        <Text className="summ" align="center">{etapSumm}</Text>
                    </Layout>
                    <Layout flex={3} className="aic">
                        <Text className="label mr2" align="center">Сумма c НДС</Text>
                        <Text className="summ" align="center">{etapSumm_nds}</Text>
                    </Layout>
                </Layout>
            ))}
        </>
    );
};

export default EtapsItogRow;