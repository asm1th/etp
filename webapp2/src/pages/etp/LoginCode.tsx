import React, { FC } from "react";
import LoginFormCode from "../../components/login/LoginFormCode";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import logo from '../../assets/img/gazprom-neft-logo-rus.svg';
import { Timer } from '@consta/uikit/Timer';
import { Layout } from '@consta/uikit/Layout';
import { Button } from '@consta/uikit/Button';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import './RNMCappETP.css';

const LoginCode: FC = () => {
    document.body.classList.add('etpStyle');
    return (
        <div className="etpStyle">
            <Layout className="jcfe">
                <Button
                    label="Ссылка на инструкцию"
                    size="xs"
                    view="clear"
                    className="mt1"
                    iconLeft={IconQuestion} />
            </Layout>
            <Grid 
                style={{height: 'calc(100% - 100px)'}}
                gap="xl" 
                cols="1" 
                xAlign="center" 
                yAlign="center">
                <GridItem>
                    <Card 
                        verticalSpace="2xl" 
                        horizontalSpace="2xl" 
                        form="round" 
                        shadow={false}
                        className="loginform">
                        <div className="tac mb1">
                            <img alt="logo" src={logo} width="160" />
                        </div>
                        <Text
                            className="tac mb1 jcc"
                            size="m" 
                            lineHeight="xs">
                                Для входа на платформу введите код, который пришел на вашу электронную почту
                        </Text>

                        <Layout flex={1} className="acc aic jcc">
                            <Text
                                size="xs" 
                                lineHeight="xs">
                                Код действителен в течении
                            </Text>
                            <Timer 
                                size="l" 
                                seconds={5} 
                                progress={80}
                                className="mr05 ml05" />
                            <Text
                                size="xs"
                                lineHeight="xs">
                                минут
                            </Text>
                        </Layout>

                        <LoginFormCode />
                    </Card>
                    <Button
                        label="Вам не пришел код подтверждения?"
                        size="xs"
                        width="full"
                        view="clear" />
                </GridItem>
            </Grid>
        </div>
    );
};

export default LoginCode;

