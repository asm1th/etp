import React, { FC } from "react";
import {
    Header,
    HeaderModule,
    HeaderMenu,
    HeaderButton,
    HeaderLogin,
    HeaderLogo
} from "@consta/uikit/Header";
import { IconRing } from "@consta/uikit/IconRing";
import { Text } from '@consta/uikit/Text';
import { useAppSelector } from "../hooks/redux";

const Navbar: FC = () => {

    const menuItems = [
        {
            label: "Проекты",
            href: "#projects",
            active: true
        },
        {
            label: "Задачи",
            href: "#tasks"
        },
        {
            label: "Какой-то пункт",
            onClick: () => alert("Какой-то пункт")
        }
    ];

    const {isAuth} = useAppSelector (state => state.auth)

    return (
        <div>
            <Header
                className="myheader"
                leftSide={
                    <>
                        <HeaderModule>
                            <HeaderLogo>
                                <Text as="p" size="l" weight="bold">
                                    Logotype
                                </Text>
                            </HeaderLogo>
                        </HeaderModule>
                        <HeaderModule indent="l">
                            <HeaderMenu items={menuItems} />
                        </HeaderModule>
                    </>
                }
                rightSide={
                    <>
                        {/* <HeaderModule indent="s">
                              <HeaderButton iconLeft={IconChat} />
                            </HeaderModule> */}
                        <HeaderModule indent="s">
                            <HeaderButton iconLeft={IconRing} />
                        </HeaderModule>
                        <HeaderModule indent="s">
                            <HeaderLogin
                                isLogged={isAuth}
                                personName="Вадим Матвеев"
                                personInfo="В другом офисе"
                                personStatus="available"
                                personAvatarUrl="https://www.pngarts.com/files/3/Cool-Avatar-Transparent-Image.png"
                                //onClick={handleLogin}
                                className="Login"
                            />
                        </HeaderModule>
                    </>
                }
            />
        </div>
    );
};

export default Navbar;