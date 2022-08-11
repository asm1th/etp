import React, { FC, useState } from "react";

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { cnMixSpace } from '@consta/uikit/MixSpace';

import { useForm } from "react-hook-form";
import TextFieldCustom from "../components/TextFieldCustomJS";
import { TextField } from "@consta/uikit/TextField";

const Login: FC = () => {
    type FormData = {
        data: string;
    };

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormData>();

    const onSubmit = handleSubmit(data => {
        console.log(data);
        alert(JSON.stringify(data, null, 2));
    });

    const [value, setValue] = useState<string | null>(null);
    const handleChange = ({ value }: { value: string | null }) => setValue(value);


    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <Card verticalSpace="2xl" horizontalSpace="2xl" form="round"
                    className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
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
                                rules={{
                                    minLength: {
                                        value: 2,
                                        message: "Имя должно быть длинее 2 символов"
                                    },
                                    required: "Поле обязательно для заполнения"
                                }} defaultValue={undefined} shouldUnregister={undefined}                            />
                        </div>
                        <Button type="submit" label="Отправить код" size="m" width="full" />
                    </form>

                    <pre>{JSON.stringify(watch(), null, 2)}</pre>

                </Card>
            </GridItem>
        </Grid>

    );
};

export default Login;

