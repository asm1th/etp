import React, { FC } from "react";
import LoginFormEmail from "../../components/LoginFormEmail";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import logo from '../../img/logo.png';
import { Text } from '@consta/uikit/Text';

const Login: FC = () => {
    return (
        <>
            <Layout className="jcfe">
                <Button
                    label="Ссылка на инструкцию"
                    size="xs"
                    view="clear"
                    className="mt1"
                    iconLeft={IconQuestion} />
            </Layout>
            <Grid gap="xl" cols="1" xAlign="center" yAlign="center">
                <GridItem>
                    <Card verticalSpace="4xl" horizontalSpace="4xl" form="round" shadow={false}
                        className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
                        <div className="tac mb1">
                            <img alt="logo" src={logo} />
                        </div>
                        <Text
                            className="tac mb1 jcc"
                            size="m" lineHeight="xs">
                            Для входа на платформу введите код, который пришел на вашу электронную почту
                        </Text>
                        <LoginFormEmail />
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

