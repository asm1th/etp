import React, { FC } from "react";
import DashHeader from '../../components/dash/DashHeader';
import DashItem from '../../components/dash/DashItem';
import { useAppSelector } from "../../hooks/redux";


const Dash: FC = () => {
    //const [theme, setTheme] = useState<ThemeItem>(themes[0])
    const { dashItems } = useAppSelector(state => state.dashReducer)

    return (
        <>
            <DashHeader />
            <div className="DashContainer">
                {dashItems.map(({ id }) => (
                    <DashItem id={id} />
                ))}
            </div>
        </>
    );
};

export default Dash;

