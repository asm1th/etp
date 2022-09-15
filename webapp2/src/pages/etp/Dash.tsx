import React, { FC, useState } from "react";
import DashHeader2 from '../../components/dash/DashHeader2';
import DashItem from '../../components/dash/DashItem';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dashSlice } from "../../store/reducers/dash/dashSlice";
import Sidebar from "../../components/dash/Sidebar";

const Dash: FC = () => {
    document.body.classList.add('etpStyle');
    //const [theme, setTheme] = useState<ThemeItem>(themes[0])
    const { dashItems } = useAppSelector(state => state.dashReducer)
    const dispatch = useAppDispatch()

    const {isToggleSidebar} = useAppSelector(state => state.dashReducer)
    const handleToggleSidebar = (checked: boolean) => {
        dispatch(dashSlice.actions.setToggleSidebar())
    };

    return (
        <>
            <Sidebar
                collapsed={isToggleSidebar}
                toggled={isToggleSidebar}
                handleToggleSidebar={handleToggleSidebar}
            />
            <main>
                <DashHeader2 />
                <div className="DashContainer">
                    {dashItems.map(({ id }) => (
                        <DashItem id={id} key={id}/>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Dash;

