import React, { useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from "@consta/uikit/Button";
import { IconCheck } from '@consta/uikit/IconCheck';
import { IconInfo } from '@consta/uikit/IconInfo';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/samp/sampSlice";
import PopoverCustom from '../util/PopoverCustom';
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../services/SampService";
import { IStag } from "../../models/ISamp";
import { format } from "date-fns";


const EtapFooter = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    const { stags, links } = useAppSelector(state => state.sampReducer)
    const { link } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    const currentStage = stags[stags.findIndex((stag: IStag) => stag.opr_usl_stage_num === props.etapId)]

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };
    ///

    const [stagSumm_nds_comment, setStagSumm_nds_comment] = useState<string>("")

    const handleStageNoNds = (etapId: number, checked: boolean) => {
        dispatch(sampSlice.actions.setStageNoNds({ etapId: etapId, checked: checked }))
        if (!checked) {
            setStagSumm_nds_comment("")
        }
    }
    const handleStageNdsComm = (etapId: number, value: string) => {
        dispatch(sampSlice.actions.setStageNoNdsComm({ etapId: etapId, value: value }))
        setStagSumm_nds_comment(value)
    }

    const onSave = () => {
        updateLink(links)
        currentStage.units.forEach(unit => {
            const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
            updateUsrp(usrp[0])
        });
        setSavedDate(format(new Date(), 'dd-MM-yyyy'))
    }

    const [savedDate, setSavedDate] = useState<string>("")


    const msg = "При активации чекбокса изменения \n автоматически применятся \n ко всем расценкам этапа"

    return (
        <div className="footer">
            <PopoverCustom position={position} text={msg} />

            <Layout>
                <Layout flex={6} className="aic mr1">
                    <Text as="div" className="label">
                        Представленное Коммерческое предложение должно учитывать все затраты Участника анализа рынка.<br />
                        Все показатели, участвующие в расчете цены, остаются неизменными на весь период действия Коммерческого предложения.
                    </Text>
                </Layout>
                <Layout flex={3} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc mr1">Итого</Layout>
                    <Layout flex={1} className="aic jcc">{parseFloat(currentStage.stagSumm) || "-- --"}</Layout>
                    <Layout flex={1} className="aic jcc">{parseFloat(currentStage.stagSumm_nds) || "-- --"}</Layout>
                </Layout>
            </Layout>
            <Layout className="mt2">
                <Layout className="aic" flex={7}>
                    <Checkbox
                        label="Не применяется НДС"
                        onChange={(e: any) => { handleStageNoNds(props.etapId, e.checked) }}
                        checked={currentStage.isNoNds} />
                    <div className="mr2 ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                    {currentStage && currentStage.isNoNds ? (
                        <>
                            <Text as="div" className="mr1">
                                Стоимость предложения не облагается НДС, в соответствии со статьей
                            </Text>
                            <TextField
                                placeholder="Указать статью"
                                size="s"
                                labelPosition="left"
                                value={stagSumm_nds_comment}
                                style={{ width: '135px' }}
                                onChange={({ e }: any) => { handleStageNdsComm(props.etapId, e.target.value) }} />
                            <Text as="div" className="ml1">
                                НК РФ
                            </Text>
                        </>) : null}
                </Layout>
                <Layout flex={4} className="aic jcfe">
                    {savedDate ? (
                        <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
                    ) : null}
                    <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
                </Layout>
            </Layout>
        </div >
    );
};

export default EtapFooter;
