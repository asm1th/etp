import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Collapse } from '@consta/uikit/Collapse';
import SampItogRowCost from "./SampItogRowCost";
import { useAppSelector } from "../../../hooks/redux";
import { numberWithSpaces } from "../../../helpers";


const SampItogCost: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const { costs } = useAppSelector(state => state.sampReducer)

    return (
        <>
            <Collapse
                label="Итоговая стоимость закупки"
                className="EtapsItog"
                isOpen={isOpen}
                onClick={() => setOpen(!isOpen)}
                hoverEffect
                rightSide={[
                    <Text className="label" align="center">Трудоемкость</Text>,
                    <Text className="summ weight700 mr4 calcFont" align="center">{parseFloat(costs.cost_result.kp_price_ei) == 0 ? "-- --" : numberWithSpaces(costs.cost_result.kp_price_ei)}</Text>,
                    <Text className="label" align="center">Сумма без НДС</Text>,
                    <Text className="summ weight700 mr4 calcFont" align="center">{parseFloat(costs.cost_result.kp_price) == 0 ? "-- --" : numberWithSpaces(costs.cost_result.kp_price)}</Text>,
                    <Text className="label" align="center">Сумма c НДС</Text>,
                    <Text className="summ weight700 calcFont" align="center">{parseFloat(costs.cost_result.kp_price_nds) == 0 ? "-- --" : numberWithSpaces(costs.cost_result.kp_price_nds)}</Text>,
                    <Button label="Показать подробнее" size="xs" view="clear" />
                ]}>
                <SampItogRowCost />
            </Collapse>
        </>
    );
};

export default SampItogCost;