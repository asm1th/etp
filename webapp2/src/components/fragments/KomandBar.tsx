import { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { sampSlice } from "../../store/reducers/main/sampSlice";

const KomandBar: FC = () => {
    const dispatch = useAppDispatch()
    const {trip} = useAppSelector(state => state.mainReducer)
    const {links} = useAppSelector(state => state.sampReducer)

    const handleChangePrice     = ({ value }: any) => dispatch(sampSlice.actions.setTripPrice(value))
    const handleChangeComment   = ({ value }: any) => dispatch(sampSlice.actions.setTripComment(value))
    
    return (
        <>
        {trip.isTrip ? (
            <div className="KomandBar">
                <Layout>
                    <Layout className="aic mr1">
                        <Text as="div">
                            Командировочные<br/>расходы
                        </Text>
                        </Layout>
                    <Layout flex={1} className="aic mr1">
                        <TextField 
                            placeholder="Введите стоимость" 
                            label="Стоимость" 
                            size="s" 
                            required 
                            value={links.travel_exp} 
                            onChange={handleChangePrice}
                            width="full"/>
                    </Layout>
                    <Layout flex={6} className="aic">
                        <TextField 
                            placeholder="Введите наименование командировочных расходов" 
                            label="Комментарий" 
                            size="s" 
                            width="full" 
                            required 
                            value={links.travel_exp_comm}
                            onChange={handleChangeComment}/>
                    </Layout>
                </Layout>
            </div>
        ) : null}
        </>
    );
};

export default KomandBar;
