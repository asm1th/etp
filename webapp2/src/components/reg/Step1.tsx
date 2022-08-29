import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";


const Step1: FC = () => {

    type IUser = {
        "lastname": any,
        "firstname": any,
        "patronymic": any,
        "email": any,
        "password": any
    }

    const User: IUser = {
        "lastname": null,
        "firstname": null,
        "patronymic": null,
        "email": null,
        "password": null
    }

    const [user, setUser] = useState<IUser>(User)

    const Errors = {
        "lastname": "",
        "email": ""
    }
    const [formErrors, setFormErrors] = useState(Errors)

    const handleOnChangeEmail = ( email:string ) => {

        if (email === null) {
            return setFormErrors((prev) => ({ ...prev, "email": "" }))
        }


        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            //debugger
            setFormErrors((prev) => ({ ...prev, "email": "" }))
        }
        else {
            //debugger
            setFormErrors((prev) => ({ ...prev, "email": "Ошибка email" }))
        }
    
    }

    const handleValidation = () => {
        let fields = user;
        let formIsValid = true;

        //Name
        if (!fields["lastname"]) {
            formIsValid = false;
            Errors["lastname"] = "Cannot be empty";
        }

        if (typeof fields["lastname"] !== "undefined") {
            if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                Errors["lastname"] = "Only letters";
            }
        }

        //Email
        handleOnChangeEmail(user.email)

        console.log(Errors)
        //setFormErrors(Errors);
        return formIsValid;
    }

    const handleField = (e: any) => {
        setUser((prev) => ({ ...prev, [e.name]: e.value }))
        console.log(user)
        handleValidation()
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
                value={user.lastname}
                onChange={(e: any) => handleField(e)}
            />
            <TextField
                label="Имя"
                name="firstname"
                type="text"
                placeholder="Введите Имя"
                width="full"
                required
                className="mt1"
                value={user.firstname}
                onChange={(e: any) => handleField(e)}
            />
            <TextField
                label="Отчество"
                name="patronymic"
                type="text"
                placeholder="Введите Отчество"
                width="full"
                className="mt1"
                value={user.patronymic}
                onChange={(e: any) => handleField(e)}
            />
            <TextField
                label="Эл. почта"
                name="email"
                type="text"
                placeholder="Введите email"
                width="full"
                className="mt1"
                value={user.email}
                onChange={(e: any) => handleField(e)}
                status={user.email === null ? undefined  : "alert"}
                caption={formErrors.email}
            />
        </>
    );
};

export default Step1;