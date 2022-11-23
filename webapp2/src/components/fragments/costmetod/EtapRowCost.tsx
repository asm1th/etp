import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { Button } from '@consta/uikit/Button';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconClose } from '@consta/uikit/IconClose';
import { Select } from '@consta/uikit/Select';
import { Combobox } from '@consta/uikit/Combobox';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { sampSlice } from "../../../store/reducers/samp/sampSlice";
import quan_unit from "../../../assets/quan_unit.json";
import { IStag } from "../../../models/ISamp";
import { numberWithSpaces } from "../../../helpers";
//import { validateEmailUtil } from "../reg/validate";


const EtapRowCost = (props: { etapId: number }) => {
    const dispatch = useAppDispatch()
    const { stags, isValidateOn, link } = useAppSelector(state => state.sampReducer)

    const currentStage = stags[stags.findIndex((stag: IStag) => stag.opr_usl_stage_num === props.etapId)]

    type Item = {
        "MANDT": number;
        "SPRAS": string;
        "MSEHI": string; // код
        "MSEH3": string;
        "MSEH6": string;
        "MSEHT": string;
        "MSEHL": string; // чел
    };

    const quan_units: Item[] = quan_unit
    
    type ndsItem = {
        label: string
        value: string
    };

    const ndsList: ndsItem[] = [
        {
            label: '0%',
            value: '0'
        }, {
            label: '10%',
            value: '10'
        },
        {
            label: '20%',
            value: '20'
        }, {
            label: 'без НДС',
            value: 'NN'
        }, {
            label: '-- --',
            value: ''
        }
    ];

    const getSelected = (List: any, value: string) => {
        List.findIndex((List: any) => List.MSEHI === value)
        return List[List.findIndex((List: any) => List.MSEHI === value)]
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

    const handleChangeUsl_quan_unit = (kp_stage_guid: string, kp_unit_guid: string, value: any) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setUsl_quan_unit({ UnitFinder: UnitFinder, value: value.MSEHI, label: value.MSEHL }))
    }

    const handleChangeVat_rate = (kp_stage_guid: string, kp_unit_guid: string, value: { label: string, value: string }) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setVat_rate({ UnitFinder: UnitFinder, value: value.value }))
    }

    const handleChangeNds_comm = (kp_stage_guid: string, kp_unit_guid: string, value: any) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        dispatch(sampSlice.actions.setNds_comm({ UnitFinder: UnitFinder, value: value }))
    }

    const handleManNumber = (kp_stage_guid: string, kp_unit_guid: string, value: string) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        if (value === '' || value.match(/^([0-9]{1,8})?$/) || value.match(/^([0-9]{1,8}\.)?([0-9]{1,3})?$/)) {
            dispatch(sampSlice.actions.setManNumber({ UnitFinder: UnitFinder, value: value }))
        }
    }

    const handleLaboriousness = (kp_stage_guid: string, kp_unit_guid: string, value: string) => {
        let UnitFinder = { kp_stage_guid: kp_stage_guid, kp_unit_guid: kp_unit_guid, link_id: link }
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setLaboriousness({ UnitFinder: UnitFinder, value: value }))
        }
    }

    return (
        <>
            {currentStage.units.map(({ 
                kp_stage_guid, 
                kp_unit_guid, 
                opr_usl_unit,
                opr_usl_unit_restr_menge, 
                opr_usl_unit_restr_quan, 
                usrps, 
                man_number, 
                laboriousness, 
                work_days,
                sum_price_ei,
                sum_price,
                sum_price_nds
                }) => (
                usrps.filter(usrp => usrp.link_id === link).map(curUsrp => (
                
                    <div key={kp_stage_guid + "_" + kp_unit_guid}>
                        <Layout className="Row mb1">
                            <Layout flex={2} direction="column">
                                <Layout>
                                    <TextField
                                        name="name"
                                        value={opr_usl_unit}
                                        size="s"
                                        className="mr05"
                                        width="full"
                                        disabled
                                        required
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
                                <Combobox
                                    name="usl_quan_unit"
                                    placeholder="Выберите ЕИ"
                                    view="default"
                                    items={quan_units}
                                    value={getSelected(quan_units, curUsrp.usl_quan_unit)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeUsl_quan_unit(kp_stage_guid, kp_unit_guid, value)}
                                    //disabled={opr_usl_unit_restr_quan === "" ? false : true}
                                    getItemLabel={(item) => item.MSEHL}
                                    getItemKey={(item) => item.MSEHI}
                                />
                            </Layout>
                            <Layout flex={1}>
                                <TextField
                                    maxLength={17}
                                    name="man_number"
                                    value={man_number}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleManNumber(kp_stage_guid, kp_unit_guid, e.target.value)}
                                    //disabled={opr_usl_unit_restr_menge === "" ? false : true}
                                    required
                                    status={ (isValidateOn && (parseFloat(man_number) === 0 || man_number === '')) ? 'alert' : undefined}
                                />
                            </Layout>
                            <Layout flex={1}>
                                <TextField
                                    maxLength={20}
                                    name="laboriousness"
                                    value={laboriousness}
                                    size="s"
                                    className="RowInput"
                                    onChange={({ e }: any) => handleLaboriousness(kp_stage_guid, kp_unit_guid, e.target.value)} 
                                    required
                                    status={(isValidateOn && (parseFloat(laboriousness) === 0 || laboriousness === '')) ? 'alert' : undefined}
                                />
                            </Layout>
                            <Layout flex={1} className="aic jcc mr1">
                                {parseFloat(work_days) == 0 ? "-- --" : work_days}
                            </Layout>

                            <Layout flex={1} className="aic jcc mr1 calcFont sum_price_ei">
                                {parseFloat(sum_price_ei) == 0 ? "-- --" : numberWithSpaces(sum_price_ei)}
                            </Layout>
                            <Layout flex={1} className="aic jcc mr1 calcFont sum_price">
                                {parseFloat(sum_price) == 0 ? "-- --" : numberWithSpaces(sum_price)}
                            </Layout>
                            <Layout flex={1} className="mr1">
                                <Select
                                    name="vat_rate"
                                    view="default"
                                    items={ndsList}
                                    value={getSelectedNDS(ndsList, curUsrp.vat_rate)}
                                    labelPosition="left"
                                    size="s"
                                    className="RowInput"
                                    onChange={({ value }) => handleChangeVat_rate(kp_stage_guid, kp_unit_guid, value)} />
                            </Layout>
                            
                            <Layout flex={1} className="aic jcc calcFont sum_price_nds">
                                {parseFloat(sum_price_nds) == 0 ? "-- --" : numberWithSpaces(sum_price_nds)}
                            </Layout>
                        </Layout>


                        {curUsrp.isSubToggle || curUsrp.vat_rate === "NN" || !currentStage.isNoNds ? (
                            <>
                                <Layout className="Row subRow mt05 mb2">
                                    {curUsrp.isSubToggle ? (
                                        <Layout flex={2}>
                                            <Layout>
                                                <TextField
                                                    maxLength={1333}
                                                    name="alt_name_unit"
                                                    value={curUsrp.alt_name_unit}
                                                    size="s"
                                                    className="mr05"
                                                    width="full"
                                                    onChange={({ value }) => handleAlt_name_unit(kp_stage_guid, kp_unit_guid, value)}
                                                />
                                                <Button
                                                    className="mr4"
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
                                        {curUsrp.vat_rate === "NN" && !currentStage.isNoNds ? (
                                            <>
                                                <Text as="div" className="mr1" size="xs">
                                                    Стоимость предложения не облагается НДС, в соответствии со статьей
                                                </Text>
                                                <TextField
                                                    maxLength={1333}
                                                    name="sub.statia"
                                                    placeholder="Указать статью"
                                                    size="xs"
                                                    labelPosition="left"
                                                    value={curUsrp.nds_comm}
                                                    required
                                                    onChange={({ value }) => handleChangeNds_comm(kp_stage_guid, kp_unit_guid, value)}
                                                    style={{ width: '100px' }} 
                                                    status={(curUsrp.nds_comm === '' && !currentStage.isNoNds) ? 'alert' : undefined}/>
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

export default EtapRowCost;

