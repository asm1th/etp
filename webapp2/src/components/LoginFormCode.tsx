import React, { FC } from "react";
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { TextField } from "@consta/uikit/TextField";
import { Layout } from '@consta/uikit/LayoutCanary';

// RTK
import { useNavigate } from 'react-router-dom'
import { useLoginCodeMutation } from '../services/authService'
import type { LoginCodeRequest } from '../services/authService'
//

const LoginFormCode: FC = () => {
    const navigate = useNavigate()

    const [formState, setFormState] = React.useState<LoginCodeRequest>({
        num1: '',
        num2: '',
        num3: '',
        num4: ''
    })

    const [loginCode, { isLoading }] = useLoginCodeMutation();

    const handleChange = ({ e }: any) => {
        console.log(e.target)
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async () => {
        try {
            await loginCode(formState).unwrap()
            navigate('/')
        } catch (err) {
            console.log("error")
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
                <Layout className="codeInputs">
                    <Layout flex={1}>
                        <TextField
                            name="num1"
                            type="text"
                            placeholder="0"
                            style={{ margin: '0 5px' }}
                            onChange={handleChange}
                            value={formState.num1}
                        />
                    </Layout>
                    <Layout flex={1}>
                        <TextField
                            name="num2"
                            type="text"
                            placeholder="0"
                            style={{ margin: '0 5px' }}
                            onChange={handleChange}
                            value={formState.num2}
                        />
                    </Layout>
                    <Layout flex={1}>
                        <TextField
                            name="num3"
                            type="text"
                            placeholder="0"
                            style={{ margin: '0 5px' }}
                            onChange={handleChange}
                            value={formState.num3}
                        />
                    </Layout>
                    <Layout flex={1}>
                        <TextField
                            name="num4"
                            type="text"
                            placeholder="0"
                            style={{ margin: '0 5px', textAlign: 'center' }}
                            onChange={handleChange}
                            value={formState.num4}
                        />
                    </Layout>
                </Layout>
            </div>
            <Button onClick={onSubmit} loading={isLoading} label="Войти в систему" size="m" width="full"
                className={cnMixSpace({ mT: 'm' })} />
        </>
    );
};

export default LoginFormCode;