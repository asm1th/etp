import { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { TextField } from "@consta/uikit/TextField";
import PopoverCustom from "../../../util/PopoverCustom";
import { IconInfo } from "@consta/uikit/IconInfo";
import { sampSlice } from "../../../../store/reducers/samp/sampSlice";
import { numberWithSpaces } from "../../../../helpers";
import SaveCostButton from "../SaveCostButton";


const TabProfitability: FC = () => {
    const dispatch = useAppDispatch()
    const {
        costs,
        isValidateOn,
        cost_sums 
    } = useAppSelector(state => state.sampReducer)

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined)
    const msg = "Рентабельность рассчитывается\n от общей суммы"
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY })
    };

    const handleProfitability = (value: string) => {
        if (value === '' || value.match(/^([0-9]{1,3})?$/) || value.match(/^([0-9]{1,11}\.)?([0-9]{1,2})?$/)) {
            dispatch(sampSlice.actions.setProfitability({ profitability: parseInt(value) > 100 ? "100" : value }))
        }
    }

    return (
        <>
            <PopoverCustom position={position} text={msg} />
            <Text as="div" size="l" className="mb1 weight700">
                Рентабельность
            </Text>
            <Layout className="Row mb1">
                <Layout className="aic">
                    <span className="FieldLabel-Star mr05">*</span>
                    <Text>
                        Рентабельность
                    </Text>
                    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                </Layout>
                <Layout className="aic ml1">
                    <TextField
                        name="profitability"
                        value={parseFloat(costs.profitability) == 0 ? "-" : costs.profitability}
                        size="s"
                        width="full"
                        className="textCenter"
                        onChange={({ e }: any) => handleProfitability(e.target.value)}
                        status={(isValidateOn && (parseFloat(costs.profitability) === 0)) ? 'alert' : undefined}
                    />
                    <Text className="ml05">%</Text>
                </Layout>
                <Layout></Layout>
            </Layout>

            <Layout className="tableHeader">
                <Layout flex={6} className="tar">
                    <Text className="label">
                        Наименование расценки
                    </Text>
                </Layout>
                <Layout flex={1}>
                    <Text className="label">Рентабельность, руб./мес.</Text>
                </Layout>

            </Layout>

            <div className="scrollBlock">
                {costs.salary.map(({ kp_unit_guid, cost_name, profitability }) => (
                    <Layout className="Row mb1" key={kp_unit_guid}>
                        <Layout flex={6}>
                            <TextField
                                name="name"
                                value={cost_name}
                                size="s"
                                width="full"
                                disabled
                            />
                        </Layout>
                        <Layout flex={1} className="jcc aic">
                            <Text>{parseFloat(profitability) == 0 ? "-- --" : numberWithSpaces(profitability)}</Text>
                        </Layout>
                    </Layout>
                ))}
            </div>
            <hr />

            <Layout>
                <Layout flex={6}>
                    <Layout ></Layout>
                    <Layout flex={1} className="aic jcc SubSummFooter">Итого</Layout>
                </Layout>
                <Layout flex={1} className="aic jcc SubSummFooter SubSummFooterLast">
                    {parseFloat(cost_sums.cost_profitability) == 0 ? "-- --" : numberWithSpaces(cost_sums.cost_profitability)}
                </Layout>
            </Layout>

            <SaveCostButton />

        </>
    );
};

export default TabProfitability;