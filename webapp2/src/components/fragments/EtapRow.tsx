import React, { useEffect } from "react";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";
import { sampSlice } from "../../store/reducers/main/sampSlice";
import { IStag, IUnit, IUsrp } from "../../models/ISamp";

const EtapRow = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    // const { etapItems } = useAppSelector(state => state.mainReducer)
    const { stags } = useAppSelector(state => state.sampReducer)
    const { link } = useAppSelector(state => state.sampReducer)

    useEffect(() => {

    }, [])

    const stagsFiltered: IStag[] = []
    stags.forEach((stag: IStag) => {
        if (stag.opr_usl_stage_num === props.etapId) {
            stagsFiltered.push(stag)
        }
    })

    const findStage = (stags: IStag[], kp_stage_guid: string) => {
        return stags[stags.findIndex(stag => stag.kp_stage_guid === kp_stage_guid)]
    }

    const findUnit = (units: IUnit[], kp_unit_guid: string) => {
        return units[units.findIndex(unit => unit.kp_unit_guid === kp_unit_guid)]
    }

    const findUsrps = (usrps: IUsrp[], link_id: string) => {
        return usrps[usrps.findIndex(usrps => usrps.link_id === link_id)]
    }

    const handleSubToggle = (kp_stage_guid: string, kp_unit_guid: string) => {
        dispatch(sampSlice.actions.toggleEtapRowSub({ kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }))
    }

    const handleAlt_name_unit = (kp_stage_guid: string, kp_unit_guid: string, value: any) => {
        debugger
        dispatch(sampSlice.actions.setAlt_name_unit({ UnitFinder: {kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link}, value: value }))
    }

    const handleChangeEI = (etapItemId: string, value: string) => {
        // dispatch(mainSlice.actions.setEtapEI({ etapItemId: etapItemId, value: value }))
        // dispatch(mainSlice.actions.setEtapSumm({ etapId: props.etapId }))
        // dispatch(mainSlice.actions.setSummKP({ etapId: props.etapId }))
    }

    const handleChangeEtapEIValue = (etapItemId: string, value: string, limit: string) => {
        if (!!limit && parseFloat(value) > parseFloat(limit)) {
            alert("Превышено значение");
        } else {
            // dispatch(mainSlice.actions.setEtapEIValue({ etapItemId: etapItemId, value: value }))
            // dispatch(mainSlice.actions.setEtapSumm({ etapId: props.etapId }))
            // dispatch(mainSlice.actions.setSummKP({ etapId: props.etapId }))
        }
    }

    const handleChangeEtapEIPRICEValue = (etapItemId: string, value: string) => {
        // dispatch(mainSlice.actions.setEtapEIPrice({ etapItemId: etapItemId, value: value }))
        // dispatch(mainSlice.actions.setEtapSumm({ etapId: props.etapId }))
        // dispatch(mainSlice.actions.setSummKP({ etapId: props.etapId }))
    }

    const handleChangeEtapNDS = (etapItemId: string, value: number) => {
        // dispatch(mainSlice.actions.setEtapNDS({ etapItemId: etapItemId, value: value }))
        // dispatch(mainSlice.actions.setEtapSumm({ etapId: props.etapId }))
        // dispatch(mainSlice.actions.setSummKP({ etapId: props.etapId }))
    }

    type Item = {
        label: string;
        id: string;
    };
    const eiList: Item[] = [{
        label: 'OBJ',
        id: 'OBJ'
    }, {
        label: 'HAR',
        id: 'HAR'
    }, {
        label: 'SRV',
        id: 'SRV'
    }, {
        label: 'TAG',
        id: 'TAG'
    }];

    type ndsItem = {
        label: string;
        id: number;
        value: string;
    };
    const ndsList: ndsItem[] = [
        {
            label: '20%',
            value: "20",
            id: 1,
        },
        {
            label: '10%',
            value: "10",
            id: 2,
        },
        {
            label: 'без НДС',
            value: "0",
            id: 4,
        }

    ];

    const getSelected = (List: any, id: any) => {
        return List[List.findIndex((List: any) => List.id === id)]
    }

    const getSelectedNDS = (List: any, nds: string) => {
        return List[List.findIndex((List: any) => List.value === nds)]
    }

    return (
        <>
            {stagsFiltered.map(({ units }) => (

                units.map(({ kp_stage_guid, kp_unit_guid, opr_usl_unit, usl_quan_unit, nsu_menge, opr_usl_unit_restr_menge, usrps }) => (
                    <div key={kp_stage_guid + "_" + kp_unit_guid}>
                        <Layout className="Row mb1">
                            <Layout flex={3} direction="column">
                                <Layout>
                                    <TextField
                                        name="name"
                                        value={opr_usl_unit}
                                        size="s"
                                        className="mr05"
                                        width="full"
                                        disabled
                                    />
                                    <Button
                                        className="mr1"
                                        iconRight={IconTeam}
                                        iconSize="s"
                                        size="s"
                                        onlyIcon={true}
                                        view="clear"
                                        onClick={() => handleSubToggle(kp_stage_guid, kp_unit_guid)}
                                    />
                                </Layout>
                            </Layout>

                            <Layout flex={1}>
                                <Select
                                    placeholder="Выберите ЕИ"
                                    view="default"
                                    items={eiList}
                                    value={getSelected(eiList, usl_quan_unit)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeEI(kp_unit_guid, value)}
                                    disabled={false}
                                />
                            </Layout>

                            <Layout flex={1}>
                                <TextField
                                    name="ei_value"
                                    value={nsu_menge}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleChangeEtapEIValue(kp_unit_guid, e.target.value, opr_usl_unit_restr_menge)}
                                    disabled={false}
                                />
                            </Layout>


                            <Layout flex={1}>
                                <TextField
                                    name="ei_price"
                                    value={usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].prices_user}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleChangeEtapEIPRICEValue(kp_unit_guid, e.target.value)} />
                            </Layout>
                            <Layout flex={1}>
                                <Select
                                    view="default"
                                    items={ndsList}
                                    value={getSelectedNDS(ndsList, usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].vat_rate)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeEtapNDS(kp_unit_guid, value)} />
                            </Layout>

                            <Layout flex={1} className="aic jcc">{usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].summ}</Layout>
                            <Layout flex={1} className="aic jcc">{usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].summ_nds}</Layout>

                        </Layout>


                        {usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].isSubToggle ? (
                            <>
                                <Layout className="Row subRow mt05 mb2">
                                    <Layout flex={3}>
                                        <Layout>
                                            <TextField
                                                name="alt_name_unit"
                                                value={usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].alt_name_unit}
                                                size="s"
                                                className="mr05"
                                                width="full"
                                                onChange={({value})=>handleAlt_name_unit(kp_stage_guid, kp_unit_guid, value)} 
                                            />
                                            <Button
                                                className="mr1"
                                                iconRight={IconClose}
                                                iconSize="s"
                                                size="s"
                                                onlyIcon={true}
                                                view="clear"
                                                onClick={() => handleSubToggle(kp_stage_guid, kp_unit_guid)}
                                            />
                                        </Layout>
                                    </Layout>

                                    <Layout flex={6} className="aic acc">
                                        {usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].vat_rate === "0" ? (
                                            <>
                                                <Text as="div" className="mr1" size="xs">
                                                    Стоимость предложения не облагается НДС, в соответствии со статьей
                                                </Text>
                                                <TextField
                                                    name="sub.statia"
                                                    placeholder="Указать статью"
                                                    size="xs"
                                                    labelPosition="left"
                                                    value={usrps[usrps.findIndex((usrps: any) => usrps.link_id === link)].nds_comm}
                                                    required
                                                    //onChange={handleChange}
                                                    style={{ width: '100px' }} />
                                                <Text
                                                    as="div"
                                                    className="ml1"
                                                    size="xs">
                                                    НК РФ
                                                </Text>
                                            </>
                                        ) : null}
                                    </Layout>
                                </Layout>
                            </>
                        ) : null}

                    </div>

                ))
            ))}

            {/* 
            {etapItemsFiltered.map(({ id, name, summ, summ_nds, ei_id, ei_name, ei_name_disable, ei_value_disable, ei_value, ei_price, nds, sub }) => (
                <div key={id}>
                    <Layout className="Row mb1">
                        <Layout flex={3} direction="column">
                            <Layout>
                                <TextField
                                    name="name"
                                    value={name}
                                    size="s"
                                    className="mr05"
                                    width="full"
                                    disabled
                                />
                                <Button
                                    className="mr1"
                                    iconRight={IconTeam}
                                    iconSize="s"
                                    size="s"
                                    onlyIcon={true}
                                    view="clear"
                                    onClick={() => handleSubToggle(id)}
                                />
                            </Layout>
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                placeholder="Выберите ЕИ"
                                view="default"
                                items={eiList}
                                value={getSelected(eiList, ei_id)}
                                labelPosition="left"
                                size="s"
                                className="RowInput"
                                onChange={({ value }) => handleChangeEI(id, value)}
                                disabled={ei_name_disable}
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                name="ei_value"
                                value={ei_value}
                                size="s"
                                className="RowInput"
                                //onChange={({ e }: any) => handleChangeEtapEIValue(id, e.target.value)}
                                disabled={ei_value_disable}
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                name="ei_price"
                                value={ei_price}
                                size="s"
                                className="RowInput"
                                onChange={({ e }: any) => handleChangeEtapEIPRICEValue(id, e.target.value)} />
                        </Layout>
                        <Layout flex={1}>
                            <Select
                                view="default"
                                items={ndsList}
                                //value={ndsList[nds]}
                                value={getSelectedNDS(ndsList, nds)}
                                labelPosition="left"
                                size="s"
                                className="RowInput"
                                onChange={({ value }) => handleChangeEtapNDS(id, value)} />
                        </Layout>
                        <Layout flex={1} className="aic jcc">{summ}</Layout>
                        <Layout flex={1} className="aic jcc">{summ_nds}</Layout>
                    </Layout>

                    {sub.isSub || nds === 0 ? (
                        <>
                            <Layout className="Row subRow mt05 mb2">
                                {sub.isSub ? (
                                    <Layout flex={3}>
                                        <Layout>
                                            <TextField
                                                name="sub.name"
                                                value={sub.name}
                                                size="s"
                                                className="mr05"
                                                width="full"
                                                onChange={handleChange}
                                            />
                                            <Button
                                                className="mr1"
                                                iconRight={IconClose}
                                                iconSize="s"
                                                size="s"
                                                onlyIcon={true}
                                                view="clear"
                                                onClick={() => handleSubToggle(id)}
                                            />
                                        </Layout>
                                    </Layout>
                                ) : null}
                                {nds === 0 ? (
                                    <Layout flex={6} className="aic acc">
                                        <Text as="div" className="mr1" size="xs">
                                            Стоимость предложения не облагается НДС, в соответствии со статьей
                                        </Text>
                                        <TextField
                                            name="sub.statia"
                                            placeholder="Указать статью"
                                            size="xs"
                                            labelPosition="left"
                                            value={sub.statia}
                                            required
                                            onChange={handleChange}
                                            style={{ width: '100px' }} />
                                        <Text
                                            as="div"
                                            className="ml1"
                                            size="xs">
                                            НК РФ
                                        </Text>
                                    </Layout>
                                ) : null}
                            </Layout>
                        </>
                    ) : null}
                </div>
            ))}
*/}

        </>
    );
};

export default EtapRow;

