import React, { FC } from "react";
import { Link } from 'react-router-dom';
import LoginFormETP from "../../components/login/LoginFormETP";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Layout } from '@consta/uikit/Layout';
import { Button } from '@consta/uikit/Button';
import logo from '../../assets/img/gazprom-neft-logo-rus.svg';
import { Text } from '@consta/uikit/Text';
import './RNMCappETP.css';

const Login: FC = () => {
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
                gap="xl" cols="1" xAlign="center" yAlign="center">
                <GridItem>
                    <Card 
                        verticalSpace="2xl" 
                        horizontalSpace="2xl" 
                        form="round" 
                        shadow={false}
                        className="loginform">
                        <div className="tac mb1">
                            <img alt="logo" src={logo} width="160"/>
                        </div>
                        <Text
                            className="tac mb1 jcc"
                            size="m" 
                            lineHeight="xs">
                            Вход на электронную торговую площадку<br/> ПАО «Газпромнефть» 
                        </Text>
                        <LoginFormETP />
                        <Layout flex={1} className="acc aic jcc" direction="column">
                            <Text
                                size="xs" 
                                lineHeight="xs"
                                view="secondary">
                                Если возникли проблемы со входом на платформу,  <Link to="/etp/write">напишите нам</Link>
                            </Text>
                        </Layout>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
};

export default Login;

