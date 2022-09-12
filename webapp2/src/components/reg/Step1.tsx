import React, { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { regSlice } from '../../store/reducers/reg/regSlice'

const Step1: FC = () => {
    const dispatch = useAppDispatch()
    const { regData, formErrors } = useAppSelector(state => state.regReducer)

    const handleField = (e: any) => {
        dispatch(regSlice.actions.setRegDataProp({ prop: e.name, value: e.value }))
    }

    return (
        <>
            <Text
                className="mb1"
                size="m"
                lineHeight="xs">
                Контактные данные пользователя
            </Text>
            <TextField
                label="Фамилия"
                name="lastname"
                type="text"
                placeholder="Введите Фамилию"
                width="full"
                required
                value={regData.lastname}
                onChange={(e: any) => handleField(e)}
                status={formErrors.lastname === "" ? undefined : "alert"}
                caption={formErrors.lastname}
            />
            <TextField
                label="Имя"
                name="firstname"
                type="text"
                placeholder="Введите Имя"
                width="full"
                required
                className="mt1"
                value={regData.firstname}
                onChange={(e: any) => handleField(e)}
                status={formErrors.firstname === "" ? undefined : "alert"}
                caption={formErrors.firstname}
            />
            <TextField
                label="Отчество"
                name="patronymic"
                type="text"
                placeholder="Введите Отчество"
                width="full"
                className="mt1"
                value={regData.patronymic}
                onChange={(e: any) => handleField(e)}
                status={formErrors.patronymic === "" ? undefined : "alert"}
                caption={formErrors.patronymic}
            />
            <TextField
                label="Эл. почта"
                name="email"
                type="text"
                placeholder="Введите email"
                width="full"
                className="mt1"
                value={regData.email}
                onChange={(e: any) => handleField(e)}
                status={formErrors.email === "" ? undefined : "alert"}
                caption={formErrors.email}
            />
            <TextField
                label="Пароль"
                name="password"
                type="text"
                placeholder="Задать пароль"
                width="full"
                className="mt1"
                value={regData.password}
                onChange={(e: any) => handleField(e)}
                status={formErrors.password === "" ? undefined : "alert"}
                caption={formErrors.password || 'Длиннее 7 символов, латиница. Содержит минимум 1 заглавную букву, 1 цифру и 1 специальный символ'}
            />
        </>
    );
};

export default Step1;