import React, { useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from "@consta/uikit/Button";
import { IconSave } from '@consta/uikit/IconSave';
import { IconInfo } from '@consta/uikit/IconInfo';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/main/sampSlice";
import PopoverCustom from '../util/PopoverCustom';
import { IStag } from "../../models/ISamp";

const EtapFooter = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()

    const { stags } = useAppSelector(state => state.sampReducer)
    const { link } = useAppSelector(state => state.sampReducer)

    const currentStage: IStag[] = []
    stags.forEach((stag: IStag) => {
        if (stag.opr_usl_stage_num === props.etapId) {
            currentStage.push(stag)
        }
    })

    let summStage = {
        summ: 0,
        summ_nds: 0,
        summ_nds_comment: ""
    }

    // const [summStage, setSummStage] = useState<string>(summStageInit)

    currentStage[0].units.forEach(unit => {
        const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
        let summ = parseFloat(usrp[0].nsu_menge) * parseFloat(usrp[0].prices_user)
        summStage.summ += summ
        if (parseFloat(usrp[0].vat_rate) > 0) {
            summStage.summ_nds += summ + summ * parseFloat(usrp[0].vat_rate) / 100
        }
    });

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };
    ///

    const handleNds = (etapId: number, checked: any) => {
        dispatch(sampSlice.actions.setNoNds({ etapId: etapId, checked: checked }))
    }
    const handleNdsComm = (etapId: number, value: string) => {
        dispatch(sampSlice.actions.setNoNdsComm({ etapId: etapId, value: value }))
        summStage.summ_nds_comment = value
    }

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
                    <Layout flex={1} className="aic jcc">{summStage.summ === 0 ? "-- --" : summStage.summ}</Layout>
                    <Layout flex={1} className="aic jcc">{summStage.summ_nds === 0 ? "-- --" : summStage.summ_nds}</Layout>
                </Layout>
            </Layout>
            <Layout className="mt2">
                <Layout className="aic" flex={10}>
                    <Checkbox
                        label="Не применяется НДС"
                        onChange={(e: any) => { handleNds(props.etapId, e.checked) }}
                        checked={currentStage[0].isNoNds} />
                    <div className="mr2 ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                    {currentStage[0] && currentStage[0].isNoNds ? (
                        <>
                            <Text as="div" className="mr1">
                                Стоимость предложения не облагается НДС, в соответствии со статьей
                            </Text>
                            <TextField
                                placeholder="Указать статью"
                                size="s"
                                labelPosition="left"
                                value={summStage && summStage.summ_nds_comment}
                                required
                                style={{ width: '115px' }}
                                onChange={({ e }: any) => { handleNdsComm(props.etapId, e.target.value)}} />
                            <Text as="div" className="ml1">
                                НК РФ
                            </Text>
                        </>) : null}
                </Layout>
                <Layout flex={1} className="aic">
                    <Button label="Сохранить изменения" size="s" iconLeft={IconSave} disabled />
                </Layout>
            </Layout>
        </div >
    );
};

export default EtapFooter;
