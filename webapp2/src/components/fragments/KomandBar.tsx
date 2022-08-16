import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { useAppSelector } from "../../hooks/redux";

const KomandBar: FC = () => {
    const [Summ, setSumm] = useState(null);
    const [Coment, setComent] = useState(null);

    const {trip, isLoading, error} = useAppSelector(state => state.tripReducer)

    return (
        <>
        {trip ? (
            <div className="KomandBar">
                <Layout>
                    <Layout className="aic mr1">
                        <Text as="div">
                            Командировочные<br/>расходы
                        </Text>
                        </Layout>
                    <Layout flex={1} className="aic mr1">
                        <TextField placeholder="Введите стоимость" label="Стоимость" size="s" required value={Summ} width="full"/>
                    </Layout>
                    <Layout flex={6} className="aic">
                        <TextField placeholder="Введите наименование командировочных расходов" label="Комментарий" size="s" width="full" required value={Coment}/>
                    </Layout>
                </Layout>
            </div>
        ) : null}
        </>
    );
};

export default KomandBar;
