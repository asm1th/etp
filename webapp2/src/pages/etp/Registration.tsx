import React, { FC, useReducer, useState } from "react";
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import logo from '../../assets/img/gazprom-neft-logo-rus.svg';
import { useNavigate } from 'react-router-dom'
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Card } from '@consta/uikit/Card';
import { Layout } from '@consta/uikit/LayoutCanary';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBarCanary';

import Step1 from "../../components/reg/Step1";
import Step2 from "../../components/reg/Step2";
import Step3 from "../../components/reg/Step3";
import { regSlice } from '../../store/reducers/reg/regSlice';
import { IRegData } from "../../store/reducers/reg/IRegistration";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useRegistrationMutation } from '../../services/authService'
import { SnackBar, SnackBarItemStatus } from "@consta/uikit/SnackBar";
import './RNMCappETP.css';

const Registration: FC = () => {
    document.body.classList.add('etpStyle');
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { regData, isAccept } = useAppSelector(state => state.regReducer)
    const [regRequest, { isLoading, isSuccess }] = useRegistrationMutation();

    const [activeStep, setActiveStep] = useState<number>(0)
    const [statusStep, setStatusStep] = useState<string>('normal')
    const steps = [
        {
            label: 'Шаг 1',
            point: 1,
            statusStep,
            lineStatus: 'normal',
            // content: <Step1 />,
            //onClick: () => clickAction(0),
        },
        {
            label: 'Шаг 2',
            point: 2,
            statusStep,
            lineStatus: 'normal',
            //onClick: () => clickAction(1),
        },
        {
            label: 'Шаг 3',
            point: 3,
            statusStep,
            lineStatus: 'normal',
            //onClick: () => clickAction(2),
        }
    ];

    const clickAction = (e: number) => {
        //setStatusStep(status === 'normal' ? 'success' : 'normal');
        setActiveStep(e)

        if (activeStep === 0) {
            if (validateStep0(regData)) {
                setActiveStep(e);
            }
        }
        if (activeStep === 1) {
            if (validateStep1(regData)) {
                setActiveStep(e);
            }
        }
        if (activeStep === 2) {
            setActiveStep(e);
        }
    };

    const handlePrev = () => setActiveStep(activeStep - 1);

    const validateStep0 = (regData: IRegData) => {
        let valid = false;
        valid = validateTextField("lastname", regData.lastname, "onlyLetters") &&
            validateTextField("firstname", regData.firstname, "onlyLetters") &&
            //validateTextField("patronymic", regData.patronymic, "onlyLetters") &&
            validateEmail()
        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateStep1 = (regData: IRegData) => {
        let valid = false;
        valid = validateTextField("org_fullname", regData.org_fullname, null) &&
            validateTextField("org_shortname", regData.org_shortname, null) &&
            validateINN("inn", regData.inn) &&
            validateKPP("kpp", regData.kpp) &&
            validatePhone("org_telephone", regData.org_telephone) &&
            validateTextField("org_telephone", regData.org_telephone, null) &&
            validateTextField("org_email", regData.org_email, null)

        return valid
        //dispatch(regSlice.actions.setIsValid(valid))
    }

    const validateTextField = (prop: string, value: string, type: any) => {
        let result = false;
        const minLen = 2;
        let iffer = value && validateSymbols(value) && value.length >= minLen
        if (type === "onlyLetters") {
            iffer = value && validateSymbolsOnlyLetters(value) && value.length >= minLen
        }
        if (iffer) {
            result = true;
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "" }))
        } else {
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "Ошибка! Допускаются только буквы. Минимум " + minLen + " буквы" }))
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
        if (!inn) {
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
                let modul: any = n % 11 % 10
                return parseInt(modul);
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
        if (!val) {
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

    const validateSymbolsOnlyLetters = (txt: string) => {
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

    const validateSymbols = (txt: string) => {
        const reSpace = /^((?!\s{2}).)*$/;
        let result = false;
        if (reSpace.test(String(txt))) {
            const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
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

    const validatePhone = (prop: string, value: string) => {
        let result = false;
        const minLen = 3;
        let iffer = value && value.length >= minLen

        if (iffer) {
            result = true;
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "" }))
        } else {
            dispatch(regSlice.actions.setRegDataError({ prop: prop, value: "Ошибка! Не правильный телефон" }))
        }
        console.log("validateTextField:" + result);
        return result
    }

    const handleNext = async () => {
        if (activeStep === 0) {
            if (validateStep0(regData)) {
                setActiveStep(activeStep + 1);
            }
        }
        if (activeStep === 1) {
            if (validateStep1(regData)) {
                setActiveStep(activeStep + 1);
            }
        }
        if (activeStep === 2) {
            onSubmit()
        }
    }

    const onSubmit = async () => {
        try {
            await regRequest(regData).unwrap()
            generateHandleAdd('success', 'Вы зарегистрировались! В течении 5 минут на вашу почту придет письмо с временным паролем');
            setTimeout(() => navigate('/'), 6000)
        } catch (err) {
            generateHandleAdd('alert', err.data.message);
        }
    };

    const onHome = () => {
        navigate('/')
    }

    // snack
    type Item = {
        key: number;
        message: string;
        status: SnackBarItemStatus;
        progressMode?: 'line' | 'timer';
    };

    function reducer(state: Item[], action: { type: 'add' | 'remove'; item: Item }): Item[] {
        switch (action.type) {
            case 'add':
                return [...state, action.item];
            case 'remove':
                return state.filter((itemInState) => itemInState.key !== action.item.key);
        }
    }

    const [items, dispatchItems] = useReducer<
        React.Reducer<Item[], { type: 'add' | 'remove'; item: Item; key?: number | string }>
    >(reducer, []);

    //const getItemIcon = (item: Item) => mapIconByStatus[item.status];
    const getItemShowProgress = (item: Item) => item.progressMode;

    const generateHandleAdd = (
        status: SnackBarItemStatus,
        msg: string
    ) => {
        const key = items.length + 1;
        const item: Item = {
            key,
            message: msg,
            status,
            progressMode: 'timer',
        };
        dispatchItems({ type: 'add', item });
    };
    // snack

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
                gap="l" 
                cols="1" 
                xAlign="center" 
                yAlign="center">
                <GridItem>
                    <Card
                        verticalSpace="2xl"
                        horizontalSpace="2xl"
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
                                    label={activeStep < 2 ? "Дальше" : "Отправить"}
                                    size="m"
                                    width="full"
                                    //disabled={ activeStep == > 2 !isAccept}
                                    disabled={activeStep === 1 ? (!isAccept) : false}
                                    iconRight={activeStep < 2 ? IconArrowRight : undefined}
                                    loading={isLoading}
                                />
                            </Layout>
                        </Layout>

                        <Layout flex={1} className="acc aic jcc mt2 mb2">
                            <Text
                                size="xs" lineHeight="xs">
                                Уже есть учетная запись? <Link to="/etp/login">Войти в систему</Link>
                            </Text>
                        </Layout>


                        {isSuccess ? (
                            <Layout className="acc aic jcc mt2 mb2">
                                <Button
                                    onClick={onHome}
                                    label="Войти"
                                    size="l" />
                            </Layout>
                        ) : null}

                        <SnackBar
                            items={items}
                            onItemClose={(item) => dispatchItems({ type: 'remove', item })}
                            getItemShowProgress={getItemShowProgress}
                            getItemAutoClose={() => 5}
                        />
                        <pre>{JSON.stringify(regData, null, 2)}</pre>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
};

export default Registration;

