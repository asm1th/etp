import React, { FC } from "react";
import '../App.css';
import LoginFormCode from "../components/LoginFormCode";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';

const LoginCode: FC = () => {
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
                        Для входа на платформу введите код, который пришел на вашу электронную почту.
                    </Text>
                    <LoginFormCode />
                </Card>
            </GridItem>
        </Grid>
    );
};

export default LoginCode;

