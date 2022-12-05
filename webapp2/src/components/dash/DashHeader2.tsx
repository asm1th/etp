import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Header,
    HeaderModule,
    HeaderMenu,
    HeaderButton,
    HeaderLogin,
    HeaderLogo,
    HeaderSearchBar
} from "@consta/uikit/Header";
import { IconRing } from "@consta/uikit/IconRing";
import { IconChatStroked } from "@consta/uikit/IconChatStroked";
import { Text } from '@consta/uikit/Text';
import logo from '../../assets/img/gazprom-neft-logo-rus.svg';
import { Button } from "@consta/uikit/Button";
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import { authSlice } from "../../store/reducers/authRTK/authSlice";
import { Modal } from "@consta/uikit/Modal";
import { Layout } from "@consta/uikit/Layout";
import { IconClose } from '@consta/uikit/IconClose';



const DashHeader2: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { dashItems } = useAppSelector(state => state.dashReducer)
    const { isToggleSidebar } = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = () => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        {
            label: "Раздел",
            href: "#projects",
            active: true
        },
        // {
        //     label: "Задачи",
        //     onClick: () => alert("Какой-то пункт")
        // }
    ];

    const { isAuth } = useAppSelector(state => state.authReducer)

    const handleLogin = async () => {
        setIsModalOpen(true)
    }

    const Logout = async () => {
        dispatch(authSlice.actions.logout())
        navigate('/etp/login')
    }



    return (
        <div>
            <Header
                className="myheader"
                leftSide={
                    <>
                        <HeaderModule>
                            {/* <HeaderLogo>
                                 <img alt="logo" src={logo} width="100" />
                            </HeaderLogo> */}
                            <Button iconLeft={IconHamburger} onClick={handleToggleSidebar} view="clear" />
                        </HeaderModule>
                        <HeaderModule indent="s">
                            <HeaderSearchBar
                                placeholder="я ищу"
                                label="поиск"
                            //value={value}
                            //onChange={handleChange}
                            //onSearch={handleSearch}
                            />
                        </HeaderModule>
                        {/* <HeaderModule indent="l">
                            <HeaderMenu items={menuItems} />
                        </HeaderModule> */}
                    </>
                }
                rightSide={
                    <>
                        <HeaderModule indent="s">
                            <HeaderButton iconLeft={IconChatStroked} />
                        </HeaderModule>
                        <HeaderModule indent="s">
                            <HeaderButton iconLeft={IconRing} />
                        </HeaderModule>
                        <HeaderModule indent="s">
                            <HeaderLogin
                                isLogged={isAuth}
                                personName="Вадим Матвеев"
                                personInfo="Эксперт"
                                personStatus="available"
                                personAvatarUrl="https://www.pngarts.com/files/3/Cool-Avatar-Transparent-Image.png"
                                onClick={handleLogin}
                                className="Login"
                            />
                        </HeaderModule>
                    </>
                }
            />

            <Modal
                isOpen={isModalOpen}
                hasOverlay
                onClickOutside={() => setIsModalOpen(false)}
                onEsc={() => setIsModalOpen(false)}
                style={{ maxWidth: "400px" }}>

                <Layout className="jcb">
                    <Text as="p" size="s" view="secondary" className="ModalTitle">
                        Выход
                    </Text>
                    <Button
                        size="l"
                        view="clear"
                        iconLeft={IconClose}
                        onClick={() => setIsModalOpen(false)}
                    />
                </Layout>
                <div className="ModalContent">
                    <Text as="p" size="m" view="primary">
                        Хотите выйти?
                    </Text>
                </div>
                <div className="ModalFooter">
                    <Button
                        size="s"
                        view="primary"
                        label="Да, выйти"
                        width="default"
                        onClick={() => Logout()}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default DashHeader2;