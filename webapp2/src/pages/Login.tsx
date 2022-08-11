import React, { FC } from "react";

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { cnMixSpace } from '@consta/uikit/MixSpace';

const Login: FC = () => {
    return (

        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <Card verticalSpace="2xl" horizontalSpace="2xl" form="round"
                    className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
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
                    <TextField
                        type="text"
                        placeholder="example@mail.ru"
                        // caption="Это подпись"
                        // status="warning" 
                        width="full"
                        caption="Это подпись"
                        status="warning"
                        className={cnMixSpace({ mT: 's', mB: '2xl', })} />
                    <Button label="Отправить код" size="m" width="full" />
                </Card>
            </GridItem>
        </Grid>

    );
};

export default Login;

