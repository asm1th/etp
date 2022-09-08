import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { useAppSelector } from "../../../hooks/redux";
import { IStag } from "../../../models/ISamp";

const KPRow = (props: { etapId: number }) => {
    const { stags, link } = useAppSelector(state => state.sampReducer)
    const currentStage: IStag[] = []
    stags.forEach((stag: IStag) => {
        if (stag.opr_usl_stage_num === props.etapId) {
            currentStage.push(stag)
        }
    })

    return (
        <>
            {currentStage.map(({ isNoNds, units }) => (
                units.map(({ kp_stage_guid, kp_unit_guid, opr_usl_unit, opr_usl_unit_restr_menge, opr_usl_unit_restr_quan, usrps }) => (
                    usrps.filter(usrp => usrp.link_id === link).map(curUsrp => (
                        <Layout className="row">
                            <Layout flex={3} className="cell">
                                <Text >
                                    {opr_usl_unit}
                                </Text>
                            </Layout>
                            <Layout flex={3} className="cell">
                                <Text >
                                    {curUsrp.alt_name_unit}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.usl_quan_unit}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.nsu_menge}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.prices_user}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.vat_rate}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.summ}
                                </Text>
                            </Layout>
                            <Layout flex={1} className="cell jcc">
                                <Text align="center">
                                    {curUsrp.summ_nds}
                                </Text>
                            </Layout>
                        </Layout>
                    ))
                ))
            ))}
        </>
    );
};

export default KPRow;