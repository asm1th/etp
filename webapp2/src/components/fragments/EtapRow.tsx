import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/samp/sampSlice";

const EtapRow = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    const { stags } = useAppSelector(state => state.sampReducer)
    const { link } = useAppSelector(state => state.sampReducer)

    const currentStage = stags[stags.findIndex((stag: any) => stag.opr_usl_stage_num === props.etapId)]

    type Item = {
        label: string;
        id: string;
    };

    const eiList: Item[] = [
        {
            label: 'Ч/Ч',
            id: 'CHS'
        },{
            label: 'шт',
            id: 'SHT'
        }
    ];

    type ndsItem = {
        label: string
        value: string
    };

    const ndsList: ndsItem[] = [{
        label: '20%',
        value: '20'
    }, {
        label: '10%',
        value: '10'
    }, {
        label: 'без НДС',
        value: ''
    }, 
    // {
    //     label: '',
    //     value: ''
    // }
];

    const getSelected = (List: any, value: string) => {
        List.findIndex((List: any) => List.id === value)
        return List[List.findIndex((List: any) => List.id === value)]
    }

    const getSelectedNDS = (List: any, value: string) => {
        return List[List.findIndex((List: any) => List.value === value)]
    }

    const handleSubToggle = (kp_stage_guid: string, kp_unit_guid: string) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.toggleEtapRowSub(UnitFinder))
    }

    const handleAlt_name_unit = (kp_stage_guid: string, kp_unit_guid: string, value: any) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setAlt_name_unit({ UnitFinder: UnitFinder, value: value }))
    }

    const handleChangeUsl_quan_unit = (kp_stage_guid: string, kp_unit_guid: string, value: { id: string, label: string }) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setUsl_quan_unit({ UnitFinder: UnitFinder, value: value.id, label: value.label }))
    }

    const handleChangeNsu_menge = (kp_stage_guid: string, kp_unit_guid: string, value: string) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setNsu_menge({ UnitFinder: UnitFinder, value: value }))
    }

    const handleChangePrices_user = (kp_stage_guid: string, kp_unit_guid: string, value: string) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setPrices_user({ UnitFinder: UnitFinder, value: value }))
    }

    const handleChangeVat_rate = (kp_stage_guid: string, kp_unit_guid: string, value: { label: string, value: string }) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setVat_rate({ UnitFinder: UnitFinder, value: value.value }))
    }

    const handleChangeNds_comm = (kp_stage_guid: string, kp_unit_guid: string, value: any) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setNds_comm({ UnitFinder: UnitFinder, value: value }))
    }

    return (
        <>
            {currentStage.units.map(({ kp_stage_guid, kp_unit_guid, opr_usl_unit, opr_usl_unit_restr_menge, opr_usl_unit_restr_quan, usrps }) => (
                usrps.filter(usrp => usrp.link_id === link).map(curUsrp => (

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
                                    name="usl_quan_unit"
                                    placeholder="Выберите ЕИ"
                                    view="default"
                                    items={eiList}
                                    value={getSelected(eiList, curUsrp.usl_quan_unit)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeUsl_quan_unit(kp_stage_guid, kp_unit_guid, value)}
                                    disabled={opr_usl_unit_restr_quan === "" ? false : true}
                                />
                            </Layout>
                            <Layout flex={1}>
                                <TextField
                                    name="ei_value"
                                    value={curUsrp.nsu_menge}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleChangeNsu_menge(kp_stage_guid, kp_unit_guid, e.target.value)}
                                    disabled={opr_usl_unit_restr_menge === "" ? false : true}
                                />
                            </Layout>

                            <Layout flex={1}>
                                <TextField
                                    name="ei_price"
                                    value={curUsrp.prices_user}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleChangePrices_user(kp_stage_guid, kp_unit_guid, e.target.value)} />
                            </Layout>
                            <Layout flex={1}>
                                <Select
                                    view="default"
                                    items={ndsList}
                                    value={getSelectedNDS(ndsList, curUsrp.vat_rate)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeVat_rate(kp_stage_guid, kp_unit_guid, value)} />
                            </Layout>

                            <Layout flex={1} className="aic jcc">{parseFloat(curUsrp.summ) || '-- --'}</Layout>
                            <Layout flex={1} className="aic jcc">{parseFloat(curUsrp.summ_nds) || '-- --'}</Layout>

                        </Layout>


                        { (curUsrp.isSubToggle || curUsrp.vat_rate === "") && !currentStage.isNoNds ? (
                            <>
                                <Layout className="Row subRow mt05 mb2">
                                    {curUsrp.isSubToggle ? (
                                        <Layout flex={3}>
                                            <Layout>
                                                <TextField
                                                    name="alt_name_unit"
                                                    value={curUsrp.alt_name_unit}
                                                    size="s"
                                                    className="mr05"
                                                    width="full"
                                                    onChange={({ value }) => handleAlt_name_unit(kp_stage_guid, kp_unit_guid, value)}
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
                                    ) : null}

                                    <Layout flex={6} className="aic acc">
                                        {curUsrp.vat_rate === "" && !currentStage.isNoNds ? (
                                            <>
                                                <Text as="div" className="mr1" size="xs">
                                                    Стоимость предложения не облагается НДС, в соответствии со статьей
                                                </Text>
                                                <TextField
                                                    name="sub.statia"
                                                    placeholder="Указать статью"
                                                    size="xs"
                                                    labelPosition="left"
                                                    value={curUsrp.nds_comm}
                                                    required
                                                    onChange={({ value }) => handleChangeNds_comm(kp_stage_guid, kp_unit_guid, value)}
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
        </>
    );
};

export default EtapRow;

