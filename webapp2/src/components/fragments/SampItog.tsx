import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Collapse } from '@consta/uikit/Collapse';
import SampItogRow from "./SampItogRow";
import { useAppSelector } from "../../hooks/redux";


const SampItog: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const { kp_summ, kp_summ_nds } = useAppSelector(state => state.sampReducer)

    return (
        <>
            <Collapse
                label="Итоговая стоимость закупки"
                className="EtapsItog"
                isOpen={isOpen}
                onClick={() => setOpen(!isOpen)}
                hoverEffect
                rightSide={[
                    <Text className="label" align="center">Сумма без НДС</Text>,
                    <Text className="summ weight700" align="center">{parseFloat(kp_summ) || "-- --"}</Text>,
                    <Text className="label" align="center">Сумма c НДС</Text>,
                    <Text className="summ weight700" align="center">{parseFloat(kp_summ_nds) || "-- --"}</Text>,
                    <Button label="Показать подробнее" size="xs" view="clear" />
                ]}>
                <SampItogRow />
            </Collapse>
        </>
    );
};

export default SampItog;