import React, { FC, useState } from "react";
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { TextField } from "@consta/uikit/TextField";

// RTK
import { useNavigate } from 'react-router-dom'
import { isFetchBaseQueryError, isErrorWithMessage } from "../helpers";
import { useLoginMutation } from '../services/authService'
import type { LoginRequest } from '../services/authService'
import { SnackBar } from '@consta/uikit/SnackBar';

const LoginForm: FC = () => {
    const navigate = useNavigate()

    const [formState, setFormState] = useState<LoginRequest>({
        //username: '',
        email: '',
        password: '',
    })

    const [login, { isLoading, isError }] = useLoginMutation();

    const handleChange = ({ e }: any) => {
        console.log(e.target)
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const result : string[] = [];
    const [messageState, setMessageState] = useState(result)

    const onSubmit = async () => {
        try {
            await login(formState).unwrap()

            
            // Being that the result is handled in extraReducers in authSlice,
            // we know that we're authenticated after this, so the user
            // and token will be present in the store

            navigate('/')
        } catch (err) {
            console.log(err)
            if (isFetchBaseQueryError(err )) {
                if ("message" in (err.data as {}) ) {
                    // setMessageState({
                    //     key: '1',
                    //     message: "Ошибка",
                    //     status: "error"
                    // });
                }
              } else if (isErrorWithMessage(err)) {
                // setMessageState({
                //     key: '1',
                //     message: err.message,
                //     status: "error"
                // });
              }
            // toast({
            //     status: 'error',
            //     title: 'Error',
            //     description: 'Oh no, there was an error!',
            //     isClosable: true,
            // })
        }
    };

    return (
        <>
            <div className={cnMixSpace({ mT: 'l' })}>
                <TextField
                    name="email"
                    type="text"
                    placeholder="Введите email"
                    width="full"
                    onChange={handleChange}
                    value={formState.email}
                />
            </div>
            <Button onClick={onSubmit} loading={isLoading} label="Отправить код" size="m" width="full"
                className={cnMixSpace({ mT: 'm' })} />
            {/* <SnackBar items={messageState} /> */}
        </>
    );
};

export default LoginForm;