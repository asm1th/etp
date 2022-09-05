import React, { FC, useState, useEffect } from "react";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Collapse } from '@consta/uikit/Collapse';
import EtapsItogRow from "./EtapsItogRow";
import { useAppSelector } from "../../hooks/redux";


const EtapsItog: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    //const { summKP, summKP_nds } = useAppSelector(state => state.mainReducer)

    const { stags } = useAppSelector(state => state.sampReducer)
    const { link } = useAppSelector(state => state.sampReducer)

    type IkpSumm = {
        summ: number,
        summ_nds: number
    }
    let kpSummInit = {
        summ: 0,
        summ_nds: 0
    }
    const [kpSumm, setKpSumm] = useState<IkpSumm>(kpSummInit)
    
    useEffect(()=>{
        let summ = 0;
        let summ_nds = 0;
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
                summ += parseFloat(usrp[0].summ) || 0
                summ_nds += parseFloat(usrp[0].summ_nds) || 0
            });
        })
        summ = parseFloat(summ.toFixed(2))
        summ_nds = parseFloat(summ_nds.toFixed(2))
        setKpSumm((prev) => ({ ...prev, summ: summ }))
        setKpSumm((prev) => ({ ...prev, summ_nds: summ_nds }))
    }, [stags, link])
    

    return (
        <>
            <Collapse
                label="Итоговая стоимость закупки"
                className="EtapsItog"
                isOpen={isOpen}
                onClick={() => setOpen(!isOpen)}
                rightSide={[
                    <Text className="label" align="center">Сумма без НДС</Text>,
                    <Text className="summ weight700" align="center">{kpSumm.summ || "-- --"}</Text>,
                    <Text className="label" align="center">Сумма c НДС</Text>,
                    <Text className="summ weight700" align="center">{kpSumm.summ_nds || "-- --"}</Text>,
                    <Button label="Показать подробнее" size="xs" view="clear"/>
                ]}>
                    <EtapsItogRow/>
            </Collapse>
        </>
    );
};

export default EtapsItog;