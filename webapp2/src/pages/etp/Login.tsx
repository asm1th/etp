import React, { FC } from "react";
import { Link } from 'react-router-dom';
import LoginFormEmail from "../../components/LoginFormEmail";
import LoginForm from "../../components/LoginForm";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
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
                    <Card verticalSpace="4xl" horizontalSpace="4xl" form="round" shadow={false}
                        className={`loginform ${cnMixSpace({ mT: '3xl', })}`}>
                        <div className="tac mb1">
                            <img alt="logo" src={logo} width="160"/>
                        </div>
                        <Text
                            className="tac mb1 jcc"
                            size="m" 
                            lineHeight="xs">
                            Для входа на платформу введите код, который пришел на вашу электронную почту
                        </Text>
                        {/* <LoginFormEmail /> */}

                        <LoginForm />
                    </Card>
                    <Layout flex={1} className="acc aic jcc">
                        <Text
                            size="xs" lineHeight="xs">
                            Нет учетной записи? <Link to="/etp/reg">Регистрация в системе</Link>
                        </Text>
                        <Text
                            size="xs" lineHeight="xs">
                            Полчучили код <Link to="/etp/logincode">Введите код</Link>
                        </Text>
                    </Layout>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

