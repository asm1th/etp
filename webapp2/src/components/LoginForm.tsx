import React, { FC } from "react";
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { cnMixSpace } from '@consta/uikit/MixSpace';

import { useForm } from "react-hook-form";
import TextFieldCustom from "../components/TextFieldCustomJS";
//import { TextField } from "@consta/uikit/TextField";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";


const LoginForm: FC = () => {
    type FormData = {
        data: string;
    };

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormData>();

    // const onSubmit = handleSubmit(data => {
    //     console.log(data);
    //     alert(JSON.stringify(data, null, 2));
    // });

    const dispatch = useDispatch()
    const onSubmit = () => {
        dispatch(AuthActionCreators.setIsAuth(true))
    };

    return (
        <>
            <form onSubmit={onSubmit}>
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
                <div className={cnMixSpace({ mT: 's', mB: '2xl', })}>
                    <TextFieldCustom
                        name="constaName"
                        type="text"
                        placeholder="placeholder"
                        width="full"
                        control={control}
                        rules={rules.required("Поле обязательно для заполнения", 2)}
                        defaultValue={undefined} shouldUnregister={undefined}
                    />
                </div>
                <Button type="submit" label="Отправить код" size="m" width="full" />
            </form>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </>
    );
};

export default LoginForm;