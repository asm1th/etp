import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useRegistrationMutation } from '../../services/authService'

import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { IconThumbUp } from '@consta/uikit/IconThumbUp';
import logo from '../../img/gazprom-neft-logo-rus.svg';

import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBarCanary';
import { Informer } from '@consta/uikit/Informer';

import Step1 from "../../components/reg/Step1";
import Step2 from "../../components/reg/Step2";
import Step3 from "../../components/reg/Step3";
import { regSlice } from '../../store/reducers/reg/regSlice'

const Login: FC = () => {
    const dispatch = useAppDispatch()
    const { regData, formErrors } = useAppSelector(state => state.regReducer)
    const [regRequest, { isLoading, isError }] = useRegistrationMutation();

    const [activeStep, setActiveStep] = useState<number>(0)
    const [status, setStatus] = useState<string>('normal')
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

        if (activeStep === 0) {
            if (validateStep0()) {
                setActiveStep(e);
            }
        }
        if (activeStep === 1) {
            if (validateStep1()) {
                setActiveStep(e);
            }
        }
        if (activeStep === 2) {
            setActiveStep(e);
        }
    };

    const handlePrev = () => setActiveStep(activeStep - 1);

    const validateStep0 = () => {
        let valid = false;
        valid = validateTextField("lastname", regData.lastname) &&
            validateTextField("firstname", regData.firstname) &&
            validateTextField("patronymic", regData.patronymic) &&
            validateEmail()
        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateStep1 = () => {
        let valid = false;
        valid = validateTextField("org_fullname", regData.org_fullname) &&
            validateTextField("org_shortname", regData.org_shortname) &&
            validateTextField("org_telephone", regData.org_telephone) &&
            validateTextField("org_email", regData.org_email) &&
            validateINN("inn", regData.inn) &&
            validateKPP("kpp", regData.kpp)

        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateTextField = (prop: string, value: string) => {
        let result = false;
        const minLen = 2;

        if (value && validateSymbols(value) && value.length >= minLen) {
            result = true;
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "" }))
        } else {
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "Ошибка! Допускаются только буквы. Минимум 2 буквы" }))
        }
        console.log("validateTextField:" + result);
        return result
    }

    const validateINN = (prop: string, inn: string) => {
        var result = false;
        let error = {
            code: 0,
            message: ""
        }
        // if (typeof inn === 'number') {
        //     inn = inn.toString();
        // } else if (typeof inn !== 'string') {
        //     inn = '';
        // }
        if (!inn.length) {
            error.code = 1;
            error.message = 'ИНН пуст';
        } else if (/[^0-9]/.test(inn)) {
            error.code = 2;
            error.message = 'ИНН может состоять только из цифр';
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.code = 3;
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
        } else {
            const checkDigit = function (inn: any, coefficients: any) {
                let n: number = 0
                for (let i in coefficients) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10);
            };
            switch (inn.length) {
                case 10:
                    let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9])) {
                        result = true;
                    }
                    break;
                case 12:
                    let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                        result = true;
                    }
                    break;
                default: break;
            }
            if (!result) {
                error.code = 4;
                error.message = 'Неверный ИНН';
            }
        }
        dispatch(regSlice.actions.setRegDataError({ prop: prop, value: error.message }))
        return result;
    }

    const validateKPP = (prop: string, val: string) => {
        let result = false;
        let error = {
            code: 0,
            message: ""
        }
        // if (typeof val === 'number') {
        //     val = val.toString();
        // } else if (typeof val !== 'string') {
        //     val = '';
        // }
        if (!val.length) {
            error.code = 1;
            error.message = 'КПП пуст';
        } else if (/[^0-9]/.test(val)) {
            error.code = 2;
            error.message = 'КПП может состоять только из цифр';
        } else if ([9].indexOf(val.length) === -1) {
            error.code = 3;
            error.message = 'КПП может состоять только из 9 цифр';
        } else {
            result = true;
        }
        dispatch(regSlice.actions.setRegDataError({ prop: prop, value: error.message }))
        return result;
    }

    const validateSymbols = (txt: string) => {
        const reSpace = /^((?!\s{2}).)*$/;
        let result = false;
        if (reSpace.test(String(txt))) {
            //const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
            const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁa-zA-Z\s]+$/;
            if (re.test(String(txt))) {
                result = true;
            } else {
                result = false;
            }
            console.log("validateInput:" + result);
        } else {
            result = false;
        }
        return result;
    }

    const validateEmail = () => {
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const email = regData.email;
        let result = false;

        if (re.test(String(email).toLowerCase())) {
            result = true;
            dispatch(regSlice.actions.setRegDataError({ prop: "email", value: "" }))
        } else {
            dispatch(regSlice.actions.setRegDataError({ prop: "email", value: "Ошибка! Формат: example@email.com" }))
        }
        console.log("validateEmail:" + result);
        return result
    }

    const handleNext = () => {
        if (activeStep === 0) {
            if (validateStep0()) {
                setActiveStep(activeStep + 1);
            }
        }
        if (activeStep === 1) {
            if (validateStep1()) {
                setActiveStep(activeStep + 1);
            }
        }
        if (activeStep === 2) {
            onSubmit()
        }
    }


    const onSubmit = async () => {
        try {
            //await regRequest(regData).unwrap()
            // Being that the result is handled in extraReducers in authSlice,
            // we know that we're authenticated after this, so the user
            // and token will be present in the store

            //todo переход на страницу огина с сообщением о том что зарегистрированы и можно входить
            //navigate('/')

        } catch (err) {
            console.log(err)
        }
    }

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
            <Grid gap="l" cols="1" xAlign="center" yAlign="center">
                <GridItem>
                    <Card
                        verticalSpace="s"
                        horizontalSpace="s"
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

                        <ProgressStepBar size="m" steps={steps} activeStepIndex={activeStep} className="mb2" />
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
                        <pre>{JSON.stringify(regData, null, 2)}</pre>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

