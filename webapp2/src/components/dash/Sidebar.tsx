import React from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { IconDiamond } from '@consta/uikit/IconDiamond';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../assets/img/gazprom-neft-logo-rus.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Badge } from '@consta/uikit/Badge';
import './Sidebar.css'

import icons_menu from '../../assets/icons/icons_menu.svg';
import icons_menu1 from '../../assets/icons/icons_menu-1.svg';
import icons_menu2 from '../../assets/icons/icons_menu-2.svg';
import icons_menu3 from '../../assets/icons/icons_menu-3.svg';
import icons_menu4 from '../../assets/icons/icons_menu-4.svg';
import icons_menu5 from '../../assets/icons/icons_menu-5.svg';
import icons_menu6 from '../../assets/icons/icons_menu-6.svg';
import icons_menu7 from '../../assets/icons/icons_menu-7.svg';
import icons_menu8 from '../../assets/icons/icons_menu-8.svg';
import icons_menu9 from '../../assets/icons/icons_menu-9.svg';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';


const Sidebar = (props: { collapsed: boolean, toggled: boolean, handleToggleSidebar: any }) => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/etp')
    }

    const handleLinkRNMC = () => {
        navigate('/etp/RNMCList')
    }

    const handleLinkZak = () => {
        navigate('/etp/zak')
    }

    return (
        <>
            <ProSidebar
                //image={sidebarBg}
                collapsed={props.collapsed}
                toggled={props.toggled}
                breakPoint="md"
                onToggle={props.handleToggleSidebar}
            >
                <SidebarHeader>
                    {/* <img alt="logo" className='DashLogo' onClick={props.handleToggleSidebar} src={logo} /> */}
                    <img alt="logo" className='DashLogo' onClick={handleLogoClick} src={logo} />
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            //tooltip="Счет-фактуры"
                            className='disabled'
                            active={false}
                            icon={<img alt="ico" src={icons_menu} width="24" />}
                            suffix={<Badge status="warning" label="4" />}>
                            Счет-фактуры
                        </MenuItem>
                        <MenuItem onClick={handleLinkRNMC} icon={<img alt="ico" src={icons_menu1} width="24" />}>
                            Заявки на участие в процедуре
                        </MenuItem>
                        <MenuItem className='disabled' active={false} icon={<img alt="ico" src={icons_menu2} width="24" />}>
                            Предквалификация
                        </MenuItem>
                        <MenuItem className='disabled' active={false} icon={<img alt="ico" src={icons_menu3} width="24" />}>
                            Отборы по НСУ
                        </MenuItem>
                        <MenuItem className='disabled' active={false} icon={<img alt="ico" src={icons_menu4} width="24" />}>
                            Отборы по ПИР и СМР
                        </MenuItem>
                        <MenuItem className='disabled' active={false} icon={<img alt="ico" src={icons_menu5} width="24" />}>
                            Поставщик МТР
                        </MenuItem>
                        <MenuItem className='disabled' icon={<img alt="ico" src={icons_menu6} width="24" />}>
                            Личный кабинет КА
                        </MenuItem>
                        <MenuItem className='disabled' active={false} icon={<img alt="ico" src={icons_menu7} width="24" />}>
                            Управление выполненем работ
                        </MenuItem>
                        <SubMenu
                            defaultOpen={true}
                            suffix={<Badge status="normal" label="2" />}
                            title='Закупочные процедуры'
                            onClick={handleLinkZak}
                            icon={<img alt="ico" src={icons_menu8} width="24" />}
                        >
                            <MenuItem onClick={handleLinkZak} active={true} icon={<IconArrowRight/>} popperarrow={true}>Перечень процедур</MenuItem>
                            <MenuItem onClick={handleLinkZak} icon={<IconArrowRight/>}>Лоты процедуры</MenuItem>
                        </SubMenu>
                        {/*
                        <SubMenu
                            prefix={<span className="badge gray">3</span>}
                            title='withPrefix'
                            icon={<IconDiamond />}
                        >
                            <MenuItem>submenu1</MenuItem>
                            <MenuItem>submenu2</MenuItem>
                            <MenuItem>submenu3</MenuItem>
                        </SubMenu>
                        <SubMenu title='multiLevel' icon={<IconDiamond />}>
                            <MenuItem>submenu1 </MenuItem>
                            <MenuItem>submenu2 </MenuItem>
                            <SubMenu title='submenu3'>
                                <MenuItem>submenu3.1 </MenuItem>
                                <MenuItem>submenu3.2 </MenuItem>
                                <SubMenu title='submenu3.3'>
                                    <MenuItem>submenu3.3.1 </MenuItem>
                                    <MenuItem>submenu3.3.2 </MenuItem>
                                    <MenuItem>submenu3.3.3 </MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu> */}
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>


                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default Sidebar;