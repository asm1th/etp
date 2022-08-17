import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { TextField } from "@consta/uikit/TextField";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { mainSlice } from "../../store/reducers/main/mainSlice";

const KomandBar: FC = () => {
    const dispatch = useAppDispatch()
    const {trip} = useAppSelector(state => state.mainReducer)

    const handleChangePrice = ({ e }: any) => {
        dispatch(mainSlice.actions.setTripPrice(e.target.value))
    }
    const handleChangeComment = ({ e }: any) => {
        dispatch(mainSlice.actions.setTripComment(e.target.value))
    }

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
                            value={trip.tripPrice} 
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
                            value={trip.tripComment}
                            onChange={handleChangeComment}/>
                    </Layout>
                </Layout>
            </div>
        ) : null}
        </>
    );
};

export default KomandBar;
