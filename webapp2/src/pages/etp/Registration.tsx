import React, { FC, useState } from "react";

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import logo from '../../img/gazprom-neft-logo-rus.svg';
import { Text } from '@consta/uikit/Text';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBarCanary';
import Step1 from "../../components/reg/Step1";
import Step2 from "../../components/reg/Step2";
import Step3 from "../../components/reg/Step3";
import { Informer } from '@consta/uikit/Informer';
import { IconThumbUp } from '@consta/uikit/IconThumbUp';


const Login: FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [status, setStatus] = useState<string>('normal');
    const steps = [
        {
            label: 'Шаг 1',
            point: 1,
            status,
            lineStatus: 'normal',
            // content: <Step1 />,
            onClick: () => clickAction(0),
        },
        {
            label: 'Шаг 2',
            point: 2,
            status,
            lineStatus: 'normal',
            onClick: () => clickAction(1),
        },
        {
            label: 'Шаг 3',
            point: 3,
            status,
            lineStatus: 'normal',
            onClick: () => clickAction(2),
        }
    ];

    const clickAction = (e: number) => {
        //setStatus(status === 'normal' ? 'success' : 'normal');
        setActiveStep(e)
    };

    //const activeStepIndex = items.findIndex((item) => item === activeStep);
    const handleNext = () => setActiveStep(activeStep + 1);
    const handlePrev = () => setActiveStep(activeStep - 1);

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

                        {/* <Steps items={items} getItemLabel={getLabel} value={activeStep} onChange={onChange} /> */}

                        <ProgressStepBar size="m" steps={steps} activeStepIndex={activeStep} className="mb2"/>
                        {activeStep === 0 ? (
                            <Step1 />
                        ) : null}
                        {activeStep === 1 ? (
                            <Step2 />
                        ) : null}
                        {activeStep === 2 ? (
                            <Step3 />
                        ) : null}

                        <Layout className="mt1">
                            <Layout flex={1} className="mr05">
                                <Button
                                    onClick={handlePrev}
                                    disabled={activeStep === 0}
                                    label={activeStep === 0 ? "Отменить" : "Назад"}
                                    size="m"
                                    width="full"
                                    view="secondary"
                                    iconLeft={activeStep === 0 ? undefined : IconArrowLeft}
                                />
                            </Layout>
                            <Layout flex={1} className="ml05">
                                <Button
                                    onClick={handleNext}
                                    //disabled={activeStep === steps.length - 1}
                                    label={activeStep < 2 ? "Дальше" : "Отправить"}
                                    size="m"
                                    width="full"
                                    iconRight={activeStep < 2 ? IconArrowRight : undefined}
                                />
                            </Layout>
                        </Layout>
                        <Informer 
                            className="mt2"
                            title="Регистрация пройдена"
                            label="В течении 5 минут на вашу почту придет письмо с временным паролем" 
                            view="filled" 
                            status="success" 
                            icon={IconThumbUp} 
                            />
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

