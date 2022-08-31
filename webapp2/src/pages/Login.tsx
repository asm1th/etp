import React, { FC } from "react";
import '../App.css';
import LoginForm from "../components/LoginForm";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';

const Login: FC = () => {
    return (
        <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
            <GridItem>
                <Card verticalSpace="4xl" horizontalSpace="4xl" form="round" shadow={false}
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
                        size="m" lineHeight="xs">
                        Введите электронную почту, на которую поступил запрос, вам придет уникальный код для входа на платформу.
                    </Text>
                    <LoginForm />
                </Card>
            </GridItem>
        </Grid>
    );
};

export default Login;

