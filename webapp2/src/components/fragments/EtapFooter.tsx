import React, { useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from "@consta/uikit/Button";
import { IconSave } from '@consta/uikit/IconSave';
import { TextField } from "@consta/uikit/TextField";
import { IconInfo } from '@consta/uikit/IconInfo';
import { Popover } from '@consta/uikit/Popover';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";
import PopoverCustom from '../util/PopoverCustom';


const EtapFooter = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    const { etapsSumms } = useAppSelector(state => state.mainReducer)
    const etapSumsCurrent = etapsSumms.find(x => x.id === props.etapId);

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleNds = (etapId: number, checked: any) => {
        dispatch(mainSlice.actions.setNoNds({ etapId: etapId, checked: checked }))
    }
    const handleNdsStatia = (etapId: number, value: string) => {
        dispatch(mainSlice.actions.setNoNdsStatia({ etapId: etapId, value: value}))
    }

    const msg = "При активации чекбокса изменения \n автоматически применятся \n ко всем расценкам этапа"

    return (
        <div className="footer">
            <PopoverCustom position={position} text={msg} />
            
            <Layout>
                <Layout flex={6} className="aic ">
                    <Text as="div" className="label">
                        Представленное Коммерческое предложение должно учитывать все затраты Участника анализа рынка.<br />
                        Все показатели, участвующие в расчете цены, остаются неизменными на весь период действия Коммерческого предложения.
                    </Text>
                </Layout>
                <Layout flex={3} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc">Итого</Layout>
                    <Layout flex={1} className="aic jcc">{etapSumsCurrent && etapSumsCurrent.etapSumm}</Layout>
                    <Layout flex={1} className="aic jcc">{etapSumsCurrent && etapSumsCurrent.etapSumm_nds}</Layout>
                </Layout>
            </Layout>
            <Layout className="mt2">
                <Layout className="aic" flex={10}>
                    <Checkbox
                        label="Не применяется НДС"
                        onChange={(e: any) => { handleNds(props.etapId, e.checked)}}
                        checked={etapSumsCurrent && etapSumsCurrent.noNds} />
                    <div className="mr2 ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                    {etapSumsCurrent && etapSumsCurrent.noNds ? (
                        <>
                            <Text as="div" className="mr1">
                                Стоимость предложения не облагается НДС, в соответствии со статьей
                            </Text>
                            <TextField
                                placeholder="Указать статью"
                                size="s"
                                labelPosition="left"
                                value={etapSumsCurrent && etapSumsCurrent.noNdsStatia}
                                required
                                style={{ width: '115px' }}
                                onChange={({ e }: any) => { debugger; handleNdsStatia(props.etapId, e.target.value)}} />
                            <Text as="div" className="ml1">
                                НК РФ
                            </Text>
                        </>) : null}
                </Layout>
                <Layout flex={1} className="aic">
                    <Button label="Сохранить изменения" size="s" iconLeft={IconSave} disabled />
                </Layout>
            </Layout>
        </div>
    );
};

export default EtapFooter;
