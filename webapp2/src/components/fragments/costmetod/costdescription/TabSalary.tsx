import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../../services/SampService";
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconInfo } from '@consta/uikit/IconInfo';
import { IconCheck } from '@consta/uikit/IconCheck';
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import PopoverCustom from "../../../util/PopoverCustom";
import { format } from "date-fns";
import quan_unit from "../../../../assets/quan_unit.json";
import {sampSlice} from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";

type Qunit = {
    "MANDT": number;
    "SPRAS": string;
    "MSEHI": string; // код
    "MSEH3": string;
    "MSEH6": string;
    "MSEHT": string;
    "MSEHL": string; // чел
};
const quan_units: Qunit[] = quan_unit


const TabSalary: FC = () => {
    const dispatch = useAppDispatch()
    const { stags, link, links, isValidateOn, salary } = useAppSelector(state => state.sampReducer)
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const msg = "Заработная плата\n по тарифным ставкам и окладам"
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    const [savedDate, setSavedDate] = useState<string>("")
    const onSave = () => {
        updateLink(links)
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
                updateUsrp(usrp[0])
            });
        })

        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    const getUnitText = (x: string) => {
        return x && quan_units[quan_units.findIndex(qunit => qunit.MSEHI === x)].MSEHL
    }

    const handleUnitSalary = (kp_unit_guid: string, value: string) => {
        value = value.replace(' ','');
        if (value === '' || value.match(/^([0-9]{1,11})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setUnitSalary({ 
                kp_unit_guid: kp_unit_guid, 
                unit_salary: value
            }))
        }
    }

    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Text as="div" size="l" className="mb1 weight700">
                Заработная плата по тарифным ставкам и окладам
            </Text>
            <Layout className="tableHeader">
                <Layout flex={5} className="tar">
                    <Text className="label mr05">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={1} className="jcc">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text className="label">Заработная плата</Text>
                    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Единица измерения (ЕИ)</Text>
                </Layout>
            </Layout>

            <div className="scrollBlock">
                {salary.map(({ kp_unit_guid, unit_salary, cost_name, usl_quan_unit }) => (
                    <Layout className="Row mb1" key={kp_unit_guid}>
                        <Layout flex={5} direction="column">
                            <TextField
                                name="cost_name"
                                value={cost_name}
                                size="s"
                                className="mr05"
                                width="full"
                                disabled
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                maxLength={17}
                                name="unit_salary"
                                value={parseFloat(unit_salary) == 0 ? "" : numberWithSpaces(unit_salary)}
                                size="s"
                                className="textCenter RowInput"
                                width="full"
                                onChange={({ e }: any) => handleUnitSalary(kp_unit_guid, e.target.value)}
                                required
                                status={ (isValidateOn && (parseFloat(unit_salary) === 0)) ? 'alert' : undefined}
                            />
                        </Layout>
                        <Layout flex={1}>
                            <TextField
                                maxLength={20}
                                value={getUnitText(usl_quan_unit)}
                                size="s"
                                className="RowInput"
                                width="full"
                                disabled
                            />
                        </Layout>
                    </Layout>
                ))}
            </div>
            <hr/>
            
            <Layout flex={4} className="aic jcfe">
                {savedDate ? (
                    <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
                ) : null}
                <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingLink || isUpdatingUsrp} />
            </Layout>
        </>
    );
};

export default TabSalary;