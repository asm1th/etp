import React, { FC, useState } from "react";
import { Header } from '@consta/header/Header'
import logo from '../../img/gazprom-neft-logo-rus.svg';


type MenuItem = {
    label: string
    subMenu?: MenuItem[]
    href?: string
    onClick?: React.EventHandler<React.MouseEvent>
}

export const menu: MenuItem[] = [
    {
        label: 'Пункт меню 1',
        href: '#',
        onClick: e => {
            e.preventDefault()
            e.stopPropagation()
        },
        subMenu: [{ label: 'Пункт меню 1-1' }, { label: 'Пункт меню 1-2' }],
    },
    { label: 'Пункт меню 2', subMenu: [{ label: 'Пункт меню 2-1' }] },
    {
        label: 'Пункт меню 3',
        subMenu: [
            { label: 'Пункт меню 3-1', subMenu: [{ label: 'Пункт меню 3-1-1' }] },
            { label: 'Пункт меню 3-2', subMenu: [{ label: 'Пункт меню 3-2-1' }] },
            {
                label: 'Пункт меню 3-3',
                subMenu: [
                    { label: 'Пункт меню 3-1', subMenu: [{ label: 'Пункт меню 3-1-1' }] },
                    { label: 'Пункт меню 3-2', subMenu: [{ label: 'Пункт меню 3-2-1' }] },
                    {
                        label: 'Пункт меню 3-3',
                        subMenu: [
                            { label: 'Пункт меню 3-3-1', subMenu: [{ label: 'Пункт меню 3-3-1-1' }] },
                            { label: 'Пункт меню 3-3-2', subMenu: [{ label: 'Пункт меню 3-3-2-1' }] },
                            { label: 'Пункт меню 3-3-3', subMenu: [{ label: 'Пункт меню 3-3-3-1' }] },
                        ],
                    },
                ],
            },
        ],
    },
]

// type TileMenuItem = {
//     title: string
//     description: string
//     image: string
// }

// export const tileMenu: TileMenuItem[] = [
//     {
//         title: 'Портал',
//         description: 'Сводная информация обо мне и подразделении, новости компании',
//         image: 'https://avatars.githubusercontent.com/u/13190808?v=4',
//     },
//     // и так далее
// ]


const DashHeader: FC = () => {
    //const [theme, setTheme] = useState<ThemeItem>(themes[0])

    return (
        <Header
            logo={<img alt="logo" src={logo} width="100" />}
            userName="Иванов Иван"
            userInfo="Владелец"
            loginButtonLabel="Войти"
            userLogined={true}
            //    notifications={notifications}
            //    notificationsActions={notificationsActions}
            notificationsTitle="Уведомления"
            notificationsGroupByDay={true}
            // tileMenu={tileMenu}
            // tileMenuTitle="Сервисы"
            menu={menu}
            style={{ zIndex: 100 }}
            fixed
        />
    );
};

export default DashHeader;