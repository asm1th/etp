import React, { FC } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";



const Step1: FC = () => {

    type IUser = {
        lastname: string,
        firstname: string,
        patronymic: string,
        email: string,
    }
    
    const User: IUser = {
        lastname: "",
        firstname: "",
        patronymic: "",
        email: ""
    }

    const handleField = (e: any) => {
        const value = e.target.value 
    }

    const handleChange = (value: any) => {
        alert("handleChange")
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
                value={User.lastname}
                onChange={(e : any) => handleField(e)}
            />
            <TextField
                label="Имя"
                name="name"
                type="text"
                placeholder="Введите Имя"
                width="full"
                required
                className="mt1"
            />
            <TextField
                label="Отчество"
                name="secondname"
                type="text"
                placeholder="Введите Отчество"
                width="full"
                className="mt1"
            />
             <TextField
                label="Эл. почта"
                name="email"
                type="text"
                placeholder="Введите Отчество"
                width="full"
                className="mt1"
            />
        </>
    );
};

export default Step1;