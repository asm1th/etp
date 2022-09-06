import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Collapse } from '@consta/uikit/Collapse';
import EtapsItogRow from "./EtapsItogRow";
import { useAppSelector } from "../../hooks/redux";


const EtapsItog: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const { kp_summ, kp_summ_nds } = useAppSelector(state => state.sampReducer)

    return (
        <>
            <Collapse
                label="Итоговая стоимость закупки"
                className="EtapsItog"
                isOpen={isOpen}
                onClick={() => setOpen(!isOpen)}
                rightSide={[
                    <Text className="label" align="center">Сумма без НДС</Text>,
                    <Text className="summ weight700" align="center">{kp_summ || "-- --"}</Text>,
                    <Text className="label" align="center">Сумма c НДС</Text>,
                    <Text className="summ weight700" align="center">{kp_summ_nds || "-- --"}</Text>,
                    <Button label="Показать подробнее" size="xs" view="clear" />
                ]}>
                <EtapsItogRow />
            </Collapse>
        </>
    );
};

export default EtapsItog;