import React, { useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from "@consta/uikit/Layout";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from "@consta/uikit/Button";
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconInfo } from '@consta/uikit/IconInfo';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { sampSlice } from "../../../store/reducers/samp/sampSlice";
import PopoverCustom from '../../util/PopoverCustom';
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../services/SampService";
import { IStag } from "../../../models/ISamp";
import { format } from "date-fns";
import { Modal } from "@consta/uikit/Modal";
import { numberWithSpaces } from "../../../helpers";
import SaveCostButton from "./SaveCostButton";


const EtapFooterCost = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    const { stags, link, links } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    const currentStage = stags[stags.findIndex((stag: IStag) => stag.opr_usl_stage_num === props.etapId)]

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    const handleStageNoNds = (etapId: number, checked: boolean) => {
        dispatch(sampSlice.actions.setStageNoNds({ etapId: etapId, checked: checked }))
        if (!checked) {
            //setStagSumm_nds_comment("")


        }
    }
    const handleStageNdsComm = (etapId: number, value: string) => {
        dispatch(sampSlice.actions.setStageNoNdsComm({ etapId: etapId, value: value }))
        //setStagSumm_nds_comment(value)
    }

    const onSave = () => {
        // if (!validateKP().isValid) {
        //     setErrorStage(validateKP().msg)
        //     setIsModalOpen(true)
        // } 
        updateLink(links)
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
                updateUsrp(usrp[0])
            });
        })

        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    // const validateKP = () => {
    //     let isValid = true
    //     let SatgeNum = 0

    //     if (links.kp_offer_expire_date == "" || links.kp_offer_expire_date == null || links.kp_offer_expire_date == undefined) {
    //         isValid = false
    //     }
    //     //stags.forEach(stag => {
    //         currentStage.units.forEach(unit => {
    //             unit.usrps.forEach(usrp => {

    //                 if (usrp.prices_user === "" || parseFloat(usrp.prices_user) === 0 || usrp.nsu_menge === "" || parseFloat(usrp.nsu_menge) === 0 ||
    //                     (usrp.vat_rate === "NN" && usrp.nds_comm === "")
    //                 ) {
    //                     let UnitFinder = { kp_stage_guid: unit.kp_stage_guid, kp_unit_guid: unit.kp_unit_guid, link_id: usrp.link_id }
    //                     dispatch(sampSlice.actions.isValid({ UnitFinder: UnitFinder, value: false }))
    //                     isValid = false
    //                     SatgeNum = currentStage.opr_usl_stage_num
    //                     console.log("???????????? ?? ??????????: "+ SatgeNum +". ???? ?????????????????? ????????????????: "+ JSON.stringify(usrp))
    //                 }
    //             })
    //         })
    //     //})
    //     return {isValid: isValid, msg: SatgeNum}
    // }

    const [errorStage, setErrorStage] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [savedDate, setSavedDate] = useState<string>("")

    const msg = "?????? ?????????????????? ???????????????? ?????????????????? \n ?????????????????????????? ???????????????????? \n ???? ???????? ?????????????????? ??????????"

    return (
        <div className="footer">
            <PopoverCustom position={position} text={msg} />

            <Layout>
                <Layout flex={4} className="aic">
                    <Layout >
                        <Text as="div" className="label mr1">
                            ?????? ?????????????? ?????????????????????? ????????????????????<br />
                            ?????????????????? ???????????????????? ???? ?????????????? ?????????????????????? ????????????.
                        </Text>
                    </Layout>
                    <Layout flex={1} className="aic jcc SubSummFooter">??????????</Layout>
                </Layout>
                <Layout flex={1} className="aic jcc SubSummFooter">{parseFloat(currentStage.cost_stage_price_ei) == 0 ? "-- --" : numberWithSpaces(currentStage.cost_stage_price_ei)}</Layout>
                <Layout flex={1} className="aic jcc SubSummFooter pr1"></Layout>
                <Layout flex={1} className="aic jcc SubSummFooter pr1"></Layout>
                <Layout flex={1} className="aic jcc SubSummFooter pr1">{parseFloat(currentStage.cost_stage_price) == 0 ? "-- --" : numberWithSpaces(currentStage.cost_stage_price)}</Layout>
                <Layout flex={1} className="aic jcc SubSummFooter"></Layout>
                <Layout flex={1} className="aic jcc SubSummFooter SubSummFooterLast">{parseFloat(currentStage.cost_stage_price_nds) == 0 ? "-- --" : numberWithSpaces(currentStage.cost_stage_price_nds)}</Layout>
            </Layout>
            <Layout className="mt2">
                <Layout className="aic" flex={7}>
                    <Checkbox
                        label="???? ?????????????????????? ??????"
                        onChange={(e: any) => { handleStageNoNds(props.etapId, e.checked) }}
                        checked={currentStage.isNoNds} />
                    <div className="mr2 ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                    {currentStage && currentStage.isNoNds ? (
                        <>
                            <Text as="div" className="mr1">
                                ?????????????????? ?????????????????????? ???? ???????????????????? ??????, ?? ???????????????????????? ???? ??????????????
                            </Text>
                            <TextField
                                maxLength={1333}
                                placeholder="?????????????? ????????????"
                                size="s"
                                labelPosition="left"
                                value={currentStage.nds_comm || ""}
                                style={{ width: '135px' }}
                                onChange={({ e }: any) => { handleStageNdsComm(props.etapId, e.target.value) }}
                                status={(currentStage.nds_comm === '' && currentStage.isNoNds) ? 'alert' : undefined} />
                            <Text as="div" className="ml1">
                                ???? ????
                            </Text>
                        </>) : null}
                </Layout>
                {/* <Layout flex={4} className="aic jcfe">
                    {savedDate ? (
                        <Text className="mr1 ml1 label tar">?????????????????? {savedDate}</Text>
                    ) : null}
                    <Button label="?????????????????? ??????????????????" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
                </Layout> */}
                <SaveCostButton/>
            </Layout>

            <Modal
                isOpen={isModalOpen}
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
                hasOverlay={false}
                className="alertModal"
            >
                <Text as="p" size="s" view="secondary">
                    ???? ?????????????????? ????????????
                </Text>
                <Text as="p" size="m" view="primary">
                    ???????????????????? ?????????????????? ?????? ???????????????????????? ???????? ???????????????????????? ?????????????? ?? ?????????? {errorStage}
                </Text>
                <div className="modalAction">
                    <Button
                        size="m"
                        view="primary"
                        label="??????????????"
                        width="default"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
            </Modal>
        </div >
    );
};

export default EtapFooterCost;
