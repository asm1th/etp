import React, { FC } from "react";

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { IconInfo } from '@consta/uikit/IconInfo';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import logo from '../../img/gazprom-neft-logo-rus.svg';
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
                    <Card
                        verticalSpace="xs"
                        horizontalSpace="4xl"
                        form="round"
                        shadow={false}
                        className="regform">
                        <div className="tac mb1">
                            <img alt="logo" src={logo} width="160" />
                        </div>
                        <Text
                            className="tac mb1 jcc"
                            size="m"
                            lineHeight="xs">
                            Регистрация участников на электронной торговой площадке ПАО «Газпромнефть»
                        </Text>



                        
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

