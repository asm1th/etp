import React, { FC, useState } from "react";
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useForm } from "react-hook-form";
import TextFieldCustom from "../components/TextFieldCustomJS";
//import {TextFieldCustom} from "../components/TextFieldCustom";
//import { TextField } from "@consta/uikit/TextField";
import { rules } from "../utils/rules";

import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/useActions";

// RTK
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/auth'
import type { LoginRequest } from '../services/auth'

//

const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formState, setFormState] = React.useState<LoginRequest>({
        //username: '',
        email: '',
        password: '',
    })

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const onSubmit = async () => {
        try {
            await login(formState).unwrap()
            // Being that the result is handled in extraReducers in authSlice,
            // we know that we're authenticated after this, so the user
            // and token will be present in the store

            //navigate('/')
        } catch (err) {
            console.log("error")
            // toast({
            //     status: 'error',
            //     title: 'Error',
            //     description: 'Oh no, there was an error!',
            //     isClosable: true,
            // })
        }
    };

    return (
        <>
            {/* <form onSubmit={onSubmit}> */}
                <Text
                    as="div"
                    align="center"
                    size="2xl"
                    weight="bold"
                    className={cnMixSpace({ mB: 'm', })}>
                    ВХОД
                </Text>
                <Text
                    className={cnMixSpace({ mT: 's', mB: 's' })}
                    size="m">
                    Введите электронную почту, на которую поступил запрос, вам придет уникальный код для входа на платформу.
                </Text>

                <input type="text" name="email" onChange={handleChange} />
                <input type="text" name="password" onChange={handleChange} />

                {/* <div className={cnMixSpace({ mT: 's', mB: '2xl', })}>
                    <TextFieldCustom
                        name="constaName"
                        type="text"
                        placeholder="Введите код"
                        width="full"
                        control={control}
                        value={password}
                        onChange={(e: any) => { setEmail(e.target.value)}}
                        rules={rules.required("Поле обязательно для заполнения", 2)}
                        defaultValue={undefined} shouldUnregister={undefined}
                    />
                </div> */}

                <Button onClick={onSubmit} loading={isLoading} label="Отправить код" size="m" width="full" />
            {/* </form> */}
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </>
    );
};

export default LoginForm;