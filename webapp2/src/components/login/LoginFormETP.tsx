import React, { FC, useState, useReducer } from "react";
import { Button } from '@consta/uikit/Button';
import { TextField } from "@consta/uikit/TextField";
import { SnackBar, SnackBarItemStatus } from "@consta/uikit/SnackBar";
import { IconMail } from '@consta/uikit/IconMail';
import { IconLock } from '@consta/uikit/IconLock';
import { Layout } from '@consta/uikit/LayoutCanary';
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authService'
import type { LoginRequest } from '../../services/authService'
import { Link } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';


// interface IStatusMessageState {
//     isError: boolean,
//     isSuccess: boolean,
//     errorMsg: string
// }

const LoginFormETP: FC = () => {
    const navigate = useNavigate()

    // const [statusMessage, setStatusMessage] = useState<IStatusMessageState>({
    //     isError: false,
    //     isSuccess: false,
    //     errorMsg: ""
    // })

    const [formState, setFormState] = useState<LoginRequest>({
        //username: '',
        email: 'petrov.ii@gazprom-neft.ru',
        password: '1234567899',
    })

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = ({ e }: any) => {
        console.log(e.target)
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async () => {
        try {
            await login(formState).unwrap()
            navigate('/etp')
            //setStatusMessage({ isError: false, errorMsg: "", isSuccess: true })
        } catch (err) {
            //setStatusMessage({ isError: true, errorMsg: err.data.message, isSuccess: false })
            generateHandleAdd('alert', err.data.message);
        }
    };

    const onLinkReg = () => {
        navigate("/etp/reg")
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
        <>
            <div className="mt2">
                <TextField
                    name="email"
                    type="text"
                    placeholder="Введите email"
                    width="full"
                    onChange={handleChange}
                    value={formState.email}
                    leftSide={IconMail}
                />
                <Layout className="jcfe mt1 tar">
                    <Text
                        size="xs"
                        lineHeight="xs">
                        <Link to="/etp/logincode/">Забыли пароль?</Link>
                    </Text>
                </Layout>
                <TextField
                    className="mt05"
                    name="password"
                    type="text"
                    placeholder="Введите пароль"
                    width="full"
                    onChange={handleChange}
                    value={formState.password}
                    leftSide={IconLock}
                />
            </div>
            <Layout className="acc aic mt2 mb2">
                <Layout flex={1} className="mr05">
                    <Button
                        onClick={onSubmit}
                        loading={isLoading}
                        label="Войти"
                        size="m"
                        width="full" />
                </Layout>
                <Layout flex={1} className="ml05">
                    <Button
                        onClick={onLinkReg}
                        loading={isLoading}
                        label="Зарегистрироваться"
                        size="m"
                        view="secondary"
                        width="full" />
                </Layout>
            </Layout>
            <SnackBar
                items={items}
                onItemClose={(item) => dispatchItems({ type: 'remove', item })}
                getItemShowProgress={getItemShowProgress}
                getItemAutoClose={() => 5}
            />
        </>
    );
};

export default LoginFormETP;